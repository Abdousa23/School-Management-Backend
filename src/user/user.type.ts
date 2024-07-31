import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Lesson } from 'src/lesson/lesson.type';
import { Role } from 'src/utils/role.enum';

@ObjectType('User')
export class User {

    @Field(type => ID)
    id: string;

    @Field()
    firstname: string

    @Field()
    lastName: string

    @Field()
    username: string

    @Field()
    password: string

    @Field()
    email: string

    @Field()
    phone: string

    @Field({nullable:true})
    address?: string

    @Field()
    refreshToken: string

    @Field(type => Role)
    role: Role

    @Field(type => [Lesson])
    lessons: Lesson[];
}
