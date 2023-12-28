import { Injectable } from '@nestjs/common';
import { GoogleApiService } from '../google-api/google-api.service';
import { google } from 'googleapis';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleSheetService {
    constructor
        (
            private readonly googleApiService: GoogleApiService,
            private readonly configService: ConfigService
        ) { }
    private readonly sheets = google.sheets('v4');
    private readonly spreadsheetId = this.configService.get('SPREAD_SHEEET_ID');

    async getSheetData(range: string): Promise<any> {
        const authClient = await this.googleApiService.authorize();

        const request = {
            spreadsheetId: this.spreadsheetId,
            range: range,
            auth: authClient,
        };

        try {
            const response = await this.sheets.spreadsheets.values.get(request);
            return response.data.values;
        } catch (error) {
            console.error('The API returned an error:', error);
            throw new Error('Error fetching data from Google Sheets API');
        }
    }
}
