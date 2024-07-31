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

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async findOneByUsername(username: string) {
    const user = await this.userModel.findOne({username:username})
    if(!user) return null
    return user
  }

  async findOneByEmail(email: string) {
    const user = await this.userModel.findOne({email:email})
    if(!user) return null

    return user
  }

  update(id: string, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
  async updateRefreshToken(updateUserInput: UpdateUserInput) {

    const updateUser = await this.userModel.findByIdAndUpdate(updateUserInput.id,updateUserInput,{new:true})
    console.log(updateUser)
    console.log('updated')
    await updateUser.save()
    console.log(updateUser)
    return updateUser

  }
}
