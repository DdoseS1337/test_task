import { IsOptional, IsString } from 'class-validator';

export class CreateSubCategoryDTO {
    @IsString()
    subCategoryName: string;

    @IsOptional()
    @IsString()
    categoryName: string;
}