import { Module } from '@nestjs/common';
import { GoogleSheetService } from './google-sheet.service';
import { GoogleSheetController } from './google-sheet.controller';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';


@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    validationSchema: Joi.object({
      SPREAD_SHEET_ID: Joi.string().required(),
      GOOGLE_API_KEY: Joi.string().required(),
    })
  })],
  providers: [GoogleSheetService],
  controllers: [GoogleSheetController]
})
export class GoogleSheetModule { }
