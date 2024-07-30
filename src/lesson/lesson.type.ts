import { ObjectType, Field, Int, ID } from '@nestjs/graphql';

@ObjectType('Lesson')
export class Lesson {
  @Field(type=> ID)
  id: string;

  @Field()
  name:string

  @Field()
  startDate:string

  @Field()
  endDate:string
  
}
