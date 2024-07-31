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
    console.log('resssd')
    console.log(res)
    return res
  }
  @Mutation(() => [Auth], { name: 'login' })
  Signin(@Args('updateAuthInput') loginAuthInput: LoginAuthInput) {
    return this.authService.login(loginAuthInput);
  }
  @Query(() => [Auth], { name: 'auth' })
  Signout() {
    return this.authService.logout();
  }

  @Query(() => Auth, { name: 'auth' })
  Refresh(@Args('id', { type: () => Int }) id: number) {
    return this.authService.handleRefreshToken();
  }



}
