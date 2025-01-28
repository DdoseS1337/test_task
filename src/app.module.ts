import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { LoggerModule } from './logger/logger.module';
import { ConfigModule } from '@nestjs/config';
import { GoogleSheetModule } from './google-sheet/google-sheet.module';
import { ProductsModule } from './products/products.module';
import { ScheduleModule } from '@nestjs/schedule';
import * as Joi from 'joi';

@Module({
  imports: [DatabaseModule, LoggerModule, ConfigModule.forRoot({
    
    isGlobal: true,
    validationSchema: Joi.object({
      PORT: Joi.number().required(),
      DATABASE_PORT: Joi.number().required(),
      DATABASE_HOST: Joi.string().required(),
      DATABASE_PASSWORD: Joi.string().required(),
      DATABASE_USER: Joi.string().required(),
      DATABASE_NAME: Joi.string().required(),
    }),
  }), GoogleSheetModule, ProductsModule, ScheduleModule.forRoot()],
  controllers: [],
  providers: [],
})
export class AppModule { }
