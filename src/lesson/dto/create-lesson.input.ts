import { InputType, Int, Field } from '@nestjs/graphql';
import {MinLength,IsDateString} from 'class-validator'
@InputType()
export class CreateLessonInput {
  // @Field(() => String )
  // id: string;

  @MinLength(3,{message:"Name must be at least 3 characters"})
  @Field(() => String )
  name: string;

  // @IsDateString({},{message:"Start date must be a valid date string"})
  @Field(() => String )
  startDate: string;

  // @IsDateString({},{message:"End date must be a valid date string"})
  @Field(() => String )
  endDate: string;

}
