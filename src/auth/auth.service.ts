import { ConflictException, Injectable, InternalServerErrorException, Res } from '@nestjs/common';
import { CreateAuthInput } from './dto/create-auth.input';
import { LoginAuthInput } from './dto/login.input';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserInput } from 'src/user/dto/update-user.input';
import { GqlExecutionContext, GraphQLExecutionContext } from '@nestjs/graphql';
import { ExecutionContext } from '@nestjs/common';
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
      res.cookie('refresh_token', updateUserInput.refreshToken, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 7 });
      return  updateResult ;
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

  login(loginAuthInput: LoginAuthInput) {
    return `This action returns all auth`;
  }

  logout() {
    return `This action returns a  auth`;
  }

  handleRefreshToken() {
    return `This action updates a  auth`;
  }

}
