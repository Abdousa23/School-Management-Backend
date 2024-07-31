import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Types } from 'mongoose';
@Schema({
    timestamps: true
})

export class User extends Document {


    @Prop({required:true})
    username: string
    
    @Prop({required:true})
    firstname: string

    @Prop({required:true})
    lastName: string

    @Prop({required:true})
    password: string

    @Prop({required:true})
    email: string

    @Prop()
    phone: string

    @Prop({default:""})
    address: string

    @Prop({required:true})
    role: string
    
    @Prop({default:''})
    refreshToken: string

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Lesson' }] })
    lessons: Types.ObjectId[];
    
}


export const UserSchema = SchemaFactory.createForClass(User)