import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { User } from 'src/user/user.type';
@ObjectType('Lesson')
export class Lesson {

  @Field(type => ID)
  id: string;

  @Field()
  name: string

  @Field()
  startDate: string

  @Field()
  endDate: string

  @Field(type => [User])
  users: User[];
}
