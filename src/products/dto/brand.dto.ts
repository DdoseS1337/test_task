import { IsOptional, IsString } from 'class-validator';

export class CreateBrandDTO {
    @IsString()
    brandName: string;

    @IsOptional()
    @IsString()
    subCategoryName: string;
}