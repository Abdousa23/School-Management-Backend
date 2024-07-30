import { Injectable } from '@nestjs/common';
import { CreateLessonInput } from './dto/create-lesson.input';
import { UpdateLessonInput } from './dto/update-lesson.input';
import { InjectModel } from '@nestjs/mongoose';
import { Lesson } from './lesson.schema';
import { Model } from 'mongoose';

@Injectable()
export class LessonService {
  constructor(@InjectModel(Lesson.name) private lessonModel:Model<Lesson>) {}
  create(createLessonInput: CreateLessonInput) {
    return 'This action adds a new lesson';
  }

  async findAll() {
    const lessons = await this.lessonModel.find()
    console.log(lessons)
    return lessons
  }

  findOne(id: number) {
    return `This action returns a #${id} lesson`;
  }

  update(id: number, updateLessonInput: UpdateLessonInput) {
    return `This action updates a #${id} lesson`;
  }

  remove(id: number) {
    return `This action removes a #${id} lesson`;
  }
}
