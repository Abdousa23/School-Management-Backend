import { Prop,Schema,SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({
    timestamps:true
})

export class Lesson extends Document {
    @Prop({required:true})
    id: string;

    @Prop({required:true})
    name:string
    
    @Prop()
    startDate:string
    
    @Prop()
    endDate:string
}

export const LessonSchema = SchemaFactory.createForClass(Lesson)