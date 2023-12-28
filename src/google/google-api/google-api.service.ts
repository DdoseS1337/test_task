import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class GoogleApiService {
    constructor(private readonly configService: ConfigService) { }
    private readonly credentials = require('/path/to/your/service-account-key.json');
    private readonly scopes = ['https://www.googleapis.com/auth/spreadsheets.readonly'];

    async authorize(): Promise<any> {
        const auth = new google.auth.GoogleAuth({
            credentials: this.credentials,
            scopes: this.scopes,
        });
        return auth.getClient();
    }
}
