import { IsOptional, IsString } from 'class-validator';

export class ProductModelDTO {    
    @IsString()
    modelName: string;

    @IsOptional()
    @IsString()
    brandName: string
}