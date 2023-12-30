import { IsString } from 'class-validator';

export class ProductModelDTO {
    @IsString()
    modelName: string;
}