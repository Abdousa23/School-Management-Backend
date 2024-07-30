import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { LessonService } from './lesson.service';
import { Lesson } from './lesson.type';
import { CreateLessonInput } from './dto/create-lesson.input';
import { UpdateLessonInput } from './dto/update-lesson.input';

@Resolver(() => Lesson)
export class LessonResolver {
  constructor(private readonly lessonService: LessonService) {}

  @Mutation(() => Lesson)
  createLesson(@Args('createLessonInput') createLessonInput: CreateLessonInput) {
    return this.lessonService.create(createLessonInput);
  }

  @Query(() => [Lesson], { name: 'lessons' })
  findAll() {
    return this.lessonService.findAll();
  }

  @Query(() => Lesson, { name: 'lesson' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.lessonService.findOne(id);
  }

  @Mutation(() => Lesson)
  updateLesson(@Args('updateLessonInput') updateLessonInput: UpdateLessonInput) {
    return this.lessonService.update(updateLessonInput.id, updateLessonInput);
  }

  @Mutation(() => Lesson)
  removeLesson(@Args('id', { type: () => Int }) id: number) {
    return this.lessonService.remove(id);
  }
}
