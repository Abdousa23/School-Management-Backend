import { Module } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { LessonResolver } from './lesson.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Lesson,LessonSchema } from './lesson.schema';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Lesson.name, schema: LessonSchema }]),
  ],
  providers: [LessonResolver, LessonService],
})
export class LessonModule {}
