import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import { ConfigService } from '@nestjs/config';
import { ProductModelsService, ProductsService, SizesService } from '../products/services';
import { ProductDTO } from 'src/products/dto/product.dto';
import { SizeDTO } from 'src/products/dto/size.dto';

@Injectable()
export class GoogleSheetService {
    private readonly sheets: any;

    constructor(
        private readonly configService: ConfigService,
        private readonly productsService: ProductsService
    ) {
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
                const dataPromises = sheetTitles.map((sheetTitle: string) => this.getDataFromGoogleSheet(sheetTitle));
                const allSheetData = await Promise.all(dataPromises);
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

    async getDataFromGoogleSheet(sheetName: string) {
        try {
            const response = await this.sheets.spreadsheets.values.get({
                spreadsheetId: this.configService.get('SPREAD_SHEET_ID'),
                range: `${sheetName}!A1:Q`,
            });
            const values = response.data.values;

            const [header1, header2, header3, names, prices, codes] = values;
            const productsNames = names.slice(1); // Отримати назви товарів, ігноруючи перший елемент
            const productPrices = prices.slice(1); // Отримати ціни товарів, ігноруючи перший елемент
            const productCodes = codes.slice(1); // Отримати коди товарів, ігноруючи перший елемент

            const sizesIndex = values.findIndex(row => row.includes('Розміри'));
            const sizesData = values.slice(sizesIndex + 1);
            const products: ProductDTO[] = [];
            const sizesDataWithoutFirstElement = sizesData.map(row => row.slice(1));

            productsNames.forEach((productName, index) => {
                const availableSizes: string[] = [];
                sizesDataWithoutFirstElement.forEach((size, sizeIndex) => {
                    if (size[index] === '+') {
                        availableSizes.push(sizesData[sizeIndex][0])
                    }
                });
                products.push({
                    name: productName.trim(),
                    price: productPrices[index],
                    code: productCodes[index],
                    sizes: availableSizes ,
                    productModel: { modelName: sheetName }
                });
            });
            
            await this.productsService.create(products)
            return { [sheetName]: values };
        } catch (error) {
            console.error(`Error fetching data from sheet '${sheetName}':`, error);
            throw new Error(`Error fetching data from sheet '${sheetName}'`);
        }
    }
}
