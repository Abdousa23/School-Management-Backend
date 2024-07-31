
import { Module } from '@nestjs/common';
import {GraphQLModule} from '@nestjs/graphql';
import { LessonModule } from './lesson/lesson.module';
import {ApolloDriverConfig,ApolloDriver} from '@nestjs/apollo'
import {ApolloServerPluginLandingPageLocalDefault} from '@apollo/server/plugin/landingPage/default'
import {MongooseModule} from '@nestjs/mongoose'
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
require('dotenv').config()

@Module({
    imports: [MongooseModule.forRoot(process.env.MONGO_DB_URI),
        GraphQLModule.forRoot<ApolloDriverConfig>({
            autoSchemaFile: true,
            driver: ApolloDriver,
            playground:false,
            plugins:[ApolloServerPluginLandingPageLocalDefault()],
            context: ({ req, res }) => ({ req, res }),
        }),
        LessonModule,
        UserModule,
        AuthModule,
    ],
    })
export class AppModule {}