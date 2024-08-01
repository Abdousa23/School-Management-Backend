import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { LessonService } from './lesson.service';
import { Lesson } from './lesson.type';
import { CreateLessonInput } from './dto/create-lesson.input';
import { UpdateLessonInput } from './dto/update-lesson.input';
import { Public } from 'src/auth/guards/auth.public'
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/jwt.auth,guard';
@Resolver(() => Lesson)
export class LessonResolver {
  constructor(private readonly lessonService: LessonService) {}

  @UseGuards(AuthGuard)
  @Mutation(() => Lesson)
  createLesson(@Args('createLessonInput') createLessonInput: CreateLessonInput) {
    return this.lessonService.create(createLessonInput);
  }

  @Public()
  @Query(() => [Lesson], { name: 'lessons' })
  findAll() {
    return this.lessonService.findAll();
  }

  @Public()
  @Query(() => Lesson, { name: 'lesson' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.lessonService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Lesson ,{name:'updateLesson'})
  updateLesson(@Args('updateLessonInput') updateLessonInput: UpdateLessonInput) {
    return this.lessonService.update(updateLessonInput.id, updateLessonInput);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Lesson, { name: 'removeLesson' })
  removeLesson(@Args('id', { type: () => String }) id: string) {
    return this.lessonService.remove(id);
  }
}
