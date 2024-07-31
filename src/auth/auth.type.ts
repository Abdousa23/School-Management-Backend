import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Auth {
  @Field(() => ID)
  id: string;

  @Field()
  username: string;

  @Field()
  firstname: string;

  @Field()
  lastName: string;

  @Field()
  email: string;

  @Field()
  password:string

  @Field({ nullable: true })
  phone?: string;

  @Field({ nullable: true })
  address?: string;

  @Field()
  refreshToken: string;

  @Field()
  role: string;
  @Field()
  accessToken:string
}