import { Controller, Get } from '@nestjs/common';
import { GoogleSheetService } from './google-sheet.service'
@Controller('google')
export class GoogleSheetController {
    constructor(private readonly googleSheetService: GoogleSheetService) { }
    @Get()
    async Getinfo() {
        return this.googleSheetService.getSheetData();
    }
}
