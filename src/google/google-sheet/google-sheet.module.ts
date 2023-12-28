import { Module } from '@nestjs/common';
import { GoogleSheetService } from './google-sheet.service';
import { GoogleApiService } from '../google-api/google-api.service';

@Module({
  providers: [GoogleSheetService, GoogleApiService]
})
export class GoogleSheetModule { }
