import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { CreateAuthInput } from './dto/create-auth.input';
import { LoginAuthInput } from './dto/login.input';
import { Context } from '@nestjs/graphql';
import { GraphQLExecutionContext } from '@nestjs/graphql';
import { Res } from '@nestjs/common';
import { Response } from 'express';
import { User } from 'src/user/user.type';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Auth } from './auth.type';
import { Public } from './guards/auth.public';

@Public()
@Resolver(Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) { }

  @Mutation(() => Auth, { name: 'register' })
  async Signup(
    @Args('createAuthInput') createAuthInput: CreateAuthInput,
    @Context() context: GqlExecutionContext,
    // @Res() res : Response
  ) {
    const res = await this.authService.register(createAuthInput, context);
    return res
  }
  @Mutation(() => Auth, { name: 'login' })
  async Signin(
    @Args('updateAuthInput') loginAuthInput: LoginAuthInput,
    @Context() context: GqlExecutionContext,
  ) {
    return await this.authService.login(loginAuthInput, context);
  }
  @Query(() => String , { name: 'logout' })
  async Signout(
    @Context() context: GqlExecutionContext,
  ) {
    return await this.authService.logout(context);
  }

  @Query(() => Auth, { name: 'refreshToken' })
  async Refresh(
    @Context() context: GqlExecutionContext,
  ) {
    return await this.authService.handleRefreshToken(context);
  }



}
