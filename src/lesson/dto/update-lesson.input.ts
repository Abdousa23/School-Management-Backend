import { CreateLessonInput } from './create-lesson.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateLessonInput extends PartialType(CreateLessonInput) {
  @Field(() => Int)
  id: number;
}
