import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { id } from 'date-fns/locale';
import * as bcrypt from 'bcrypt'
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel:Model<User>
  ){}
  async create(createUserInput: CreateUserInput) {

    const hashedPassword = await await bcrypt.hash(createUserInput.password, 10);
    createUserInput.password = hashedPassword;

    const user = await this.userModel.create(createUserInput)

    return user
  }

  async findAll() {
    return await this.userModel.find()
  }

  async findOne(id: number) {
    return await this.userModel.findById(id)
  }

  async findOneByUsername(username: string) {
    const user = await this.userModel.findOne({username:username})
    if(!user) return null
    return user
  }

  async findOneByEmail(email: string) {
    const user = await this.userModel.findOne({email:email})
    if(!user) return null
  console.log('found user',user)
    return user
  }

  async update(id: string, updateUserInput: UpdateUserInput) {
    return await this.userModel.findByIdAndUpdate(id,updateUserInput,{new:true})
  }

  async remove(id: number) {
    return await this.userModel.findByIdAndDelete(id)
  }
  async updateRefreshToken(updateUserInput: UpdateUserInput) {

    const updateUser = await this.userModel.findByIdAndUpdate(updateUserInput.id,updateUserInput,{new:true})
    await updateUser.save()
    return updateUser

  }
  async deleteRefreshToken(email: string,username:string) {
    const user = await this.findOneByEmail(email) || await this.findOneByUsername(username)
    
    return this.userModel.findByIdAndUpdate(user.id,{refreshToken:""},{new:true})
  }
}
