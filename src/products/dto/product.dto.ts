import { ProductModelDTO } from "./product-model.dto";
import { SizeDTO } from "./size.dto";
import { IsString, IsNumber, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class ProductDTO {
    @IsString()
    name: string;

    @IsNumber()
    price: number;

    @IsNumber()
    code: number;

    @ValidateNested()
    productModel: ProductModelDTO;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => SizeDTO)
    sizes: SizeDTO[];
}