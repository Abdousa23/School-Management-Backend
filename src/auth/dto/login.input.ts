import { CreateAuthInput } from './create-auth.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class LoginAuthInput extends PartialType(CreateAuthInput) {
  @Field(() => String)
  username: string;
  @Field(() => String)
  email: string;
  @Field(() => String)
  password: string;
}
