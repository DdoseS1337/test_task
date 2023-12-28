import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleSheetService {
    private readonly sheets: any;

    constructor(private readonly configService: ConfigService) {
        this.sheets = google.sheets({ version: 'v4', auth: this.configService.get('GOOGLE_API_KEY') });
    }

    async getSheetData(): Promise<any> {
        try {
            const response = await this.sheets.spreadsheets.get({
                spreadsheetId: this.configService.get('SPREAD_SHEET_ID'),
            });

            const sheetsList = response.data.sheets;
            if (sheetsList) {
                const sheetTitles = sheetsList.map((sheet: any) => sheet.properties?.title);
                console.log('List of sheets:', sheetTitles);

                const dataPromises = sheetTitles.map((sheetTitle: any) => this.getDataFromGoogleSheet(sheetTitle));
                const allSheetData = await Promise.all(dataPromises);
                console.log('Data from all sheets:', allSheetData);
                return allSheetData;
            } else {
                console.log('No sheets found in the spreadsheet.');
                return [];
            }
        } catch (error) {
            console.error('The API returned an error:', error);
            throw new Error('Error fetching data from Google Sheets API');
        }
    }

    async getDataFromGoogleSheet(sheetName: any) {
        try {
            const response = await this.sheets.spreadsheets.values.get({
                spreadsheetId: this.configService.get('SPREAD_SHEET_ID'),
                range: `${sheetName}!A1:Q`,
            });

            const values = response.data.values;
            if (values) {
                console.log(`Data from sheet '${sheetName}':`, values);
                return { [sheetName]: values };
            } else {
                console.log(`No data found in sheet '${sheetName}'.`);
                return { [sheetName]: [] };
            }
        } catch (error) {
            console.error(`Error fetching data from sheet '${sheetName}':`, error);
            throw new Error(`Error fetching data from sheet '${sheetName}'`);
        }
    }
}
