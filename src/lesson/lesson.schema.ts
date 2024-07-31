import { Prop,Schema,SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Types } from 'mongoose';
@Schema({
    timestamps:true
})

export class Lesson extends Document {

    @Prop({required:true})
    name:string
    
    @Prop()
    startDate:string
    
    @Prop()
    endDate:string
    
    @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
    users: Types.ObjectId[];
}

export const LessonSchema = SchemaFactory.createForClass(Lesson)