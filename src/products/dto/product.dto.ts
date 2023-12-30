import { ProductModelDTO } from "./product-model.dto";
import { SizeDTO } from "./size.dto";

export class ProductDTO {
    name: string;
    price: number;
    code: number;
    productModel: ProductModelDTO;
    sizes: string[];
}