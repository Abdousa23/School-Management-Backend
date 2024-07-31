import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateAuthInput {

  @IsNotEmpty()
  @Field()
  username: string;
  @IsNotEmpty()
  @Field()
  firstname: string;
  @IsNotEmpty()
  @Field()
  lastName: string;
  @IsNotEmpty()
  @Field()
  password: string;
  @IsNotEmpty()
  @Field()
  confirmPassword: string;
  @IsNotEmpty()
  @Field()
  email: string;

  @Field({ nullable: true })
  phone?: string;

  @Field({ nullable: true })
  address?: string;

  @Field({ defaultValue: "" })
  refreshToken: string

  @Field({ defaultValue: 'USER' })
  role: string;
}