import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateLessonInput } from './dto/create-lesson.input';
import { UpdateLessonInput } from './dto/update-lesson.input';
import { InjectModel } from '@nestjs/mongoose';
import { Lesson } from './lesson.schema';
import { Model } from 'mongoose';
import { checkValideDate } from 'src/utils/dateCheck';
@Injectable()
export class LessonService {
  constructor(@InjectModel(Lesson.name) private lessonModel:Model<Lesson>) {}
  async create(createLessonInput: CreateLessonInput) {
    
    checkValideDate(createLessonInput.startDate,createLessonInput.endDate)
    const lesson = await this.lessonModel.create(createLessonInput)
    console.log(lesson) 
    return lesson;
  }

  async findAll() {
    const lessons = await this.lessonModel.find()
    console.log(lessons)
    if(!lessons) throw new NotFoundException('No lessons found')
    
    return lessons
  }

  async findOne(id: string) {
    const lesson = await this.lessonModel.findOne({_id:id})
    if(!lesson) throw new NotFoundException('Lesson not found')
    return lesson 
  }

  async update(id: string, updateLessonInput: UpdateLessonInput) {

    checkValideDate(updateLessonInput.startDate,updateLessonInput.endDate)
    const updatedLesson = await this.lessonModel.findByIdAndUpdate(id,updateLessonInput,{new:true}).exec()
    
    if(!updatedLesson) throw new NotFoundException('Lesson not found')
    
      return updatedLesson 
  }

  async remove(id: string) {
    const deletedLesson = await this.lessonModel.findByIdAndDelete(id)
    if(!deletedLesson) throw new NotFoundException('Lesson not found')
    return deletedLesson
  }
}
