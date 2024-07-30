
import { Module } from '@nestjs/common';
import {GraphQLModule} from '@nestjs/graphql';
import { LessonModule } from './lesson/lesson.module';
import {ApolloDriverConfig,ApolloDriver} from '@nestjs/apollo'
import {ApolloServerPluginLandingPageLocalDefault} from '@apollo/server/plugin/landingPage/default'
import {MongooseModule} from '@nestjs/mongoose'
require('dotenv').config()

@Module({
    imports: [MongooseModule.forRoot(process.env.MONGO_DB_URI),
        GraphQLModule.forRoot<ApolloDriverConfig>({
            autoSchemaFile: true,
            driver: ApolloDriver,
            playground:false,
            plugins:[ApolloServerPluginLandingPageLocalDefault()]
        }),
        LessonModule,
    ],
    })
export class AppModule {}