import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field()
  username: string;

  @Field()
  firstname: string;

  @Field()
  lastName: string;

  @Field()
  password: string;

  @Field()
  confirmPassword: string;
  
  @Field()
  email: string;

  @Field({ nullable: true })
  phone?: string;

  @Field({ nullable: true })
  address?: string;

  @Field({nullable:true,defaultValue:""})
  refreshToken:string

  @Field({defaultValue:'USER'})
  role: string;
}