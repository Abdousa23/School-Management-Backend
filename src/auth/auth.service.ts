import { ConflictException, Injectable, InternalServerErrorException, Res, UnauthorizedException } from '@nestjs/common';
import { CreateAuthInput } from './dto/create-auth.input';
import { LoginAuthInput } from './dto/login.input';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserInput } from 'src/user/dto/update-user.input';
import { GqlExecutionContext, GraphQLExecutionContext } from '@nestjs/graphql';
import { ExecutionContext } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) { }
  async updateRefreshToken(updateUserInput: UpdateUserInput, context: any) {
    try {
      const searchUser = await this.userService.findOneByEmail(updateUserInput.email);
      const user = searchUser;
      const updateResult = await this.userService.updateRefreshToken(updateUserInput);
      const res: Response = context.res;
      res.cookie('refreshToken', updateUserInput.refreshToken, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 7 });
      return updateResult;
    } catch (error) {
      throw new InternalServerErrorException('Something went wrong while updating refresh token with message:' + error.message);
    }
  }
  async register(createAuthInput: CreateAuthInput, context: GqlExecutionContext) {
    try {
      const foundEmail = await this.userService.findOneByEmail(createAuthInput.email)
      if (foundEmail) throw new ConflictException('Email already exists')

      const foundUsername = await this.userService.findOneByUsername(createAuthInput.username)

      if (foundUsername) throw new ConflictException('Username already exists')

      if (createAuthInput.password !== createAuthInput.confirmPassword) {
        throw new ConflictException('Password does not match')
      }

      const createUserInput: CreateAuthInput = {
        ...createAuthInput,// Add the missing refreshToken property
      };
      const createdUser = await this.userService.create(createUserInput);
      if (!createdUser) throw new InternalServerErrorException('User not created')
      const userPayload = { username: createdUser.username, sub: createdUser._id, role: createdUser.role }
      const accessToken = await this.jwtService.signAsync(userPayload, { secret: process.env.ACCESS_TOKEN_SECRET, expiresIn: '1h' })
      const refreshToken = await this.jwtService.signAsync(userPayload, { secret: process.env.REFRESH_TOKEN_SECRET, expiresIn: '7d' });
      const updateInput = { id: createdUser.id, email: createdUser.email, password: createdUser.password, refreshToken }
      const updateresult = await this.updateRefreshToken(updateInput, context);
      const returnData = {
        ...updateresult.toObject(),
        accessToken: accessToken,
      };

      return returnData
    } catch (error) {
      throw new InternalServerErrorException('Something went wrong while creating user with message:' + error.message)
    }

  }

  async login(loginAuthInput: LoginAuthInput, context: GqlExecutionContext) {
    try {
      const { email, username, password } = loginAuthInput;

      const foundUserByEmail = await this.userService.findOneByEmail(email);
      const foundUserByUsername = await this.userService.findOneByUsername(username);
      if (!foundUserByEmail && !foundUserByUsername) {
        throw new ConflictException('User not found, please enter a valid email or username');
      }

      const user = foundUserByEmail || foundUserByUsername;

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new ConflictException('Invalid password');
      }

      const userPayload = { username: user.username, sub: user._id, role: user.role };
      const accessToken = await this.jwtService.signAsync(userPayload, { secret: process.env.ACCESS_TOKEN_SECRET, expiresIn: '1h' });
      const refreshToken = await this.jwtService.signAsync(userPayload, { secret: process.env.REFRESH_TOKEN_SECRET, expiresIn: '7d' });

      const updateInput = { id: user.id, email: user.email, password: user.password, refreshToken };
      console.log(updateInput)
      const updateresult = await this.updateRefreshToken(updateInput, context);
      console.log('test')
      const returnData = {
        ...updateresult.toObject(),
        accessToken: accessToken,
      };
      console.log(returnData)

      return returnData;

    } catch (error) {
      throw new InternalServerErrorException('Something went wrong while logging in: ' + error.message);
    }
  }

  async logout(context: GqlExecutionContext | any) {
    try {
      const res: Response = context.res;
      console.log(context.req.headers.authorization)
      const accessToken = context.req.headers.authorization.split(' ')[1];
      console.log(accessToken)
      const user = await this.jwtService.decode(accessToken);
      console.log(user)
      await this.userService.deleteRefreshToken(user.email, user.username);
      res.clearCookie('refreshToken');
      return 'User logged out successfully'
    } catch (error) {
      throw new InternalServerErrorException('Something went wrong while logging out: ' + error.message);
    }
  }

  async handleRefreshToken(context: GqlExecutionContext | any) {
    try {
      const cookies = context.req.cookies;
      console.log(cookies)
      if (!cookies?.refreshToken) {
        throw new UnauthorizedException({ message: 'Unauthorized please reconnect to your account' });
      }
      const refreshToken = cookies.refreshToken;
      console.log(refreshToken)
      const searchUser = await this.jwtService.decode(refreshToken);
      console.log(searchUser)
      const user = await this.userService.findOneByEmail(searchUser.email) || await this.userService.findOneByUsername(searchUser.username);
      console.log('user searched')
      console.log(user)
      if (!user) {
        throw new UnauthorizedException({ message: 'Unauthorized' });
      }
      const decodedUser = await this.jwtService.verifyAsync(
        refreshToken,
        { secret: process.env.REFRESH_TOKEN_SECRET }
      );

      const payload = { email: decodedUser.email, sub: decodedUser.sub, role: decodedUser.role };
      const accessToken = await this.jwtService.signAsync(payload, { secret: process.env.ACCESS_TOKEN_SECRET });
      return { accessToken };
    } catch (error) {
      throw new InternalServerErrorException('Something went wrong while refreshing token with message:' + error.message);
    }
  }

}
