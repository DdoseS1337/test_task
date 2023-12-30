import { PartialType } from '@nestjs/mapped-types';
import { ProductDTO } from './product.dto'

export class UpdateProductDTO extends PartialType(ProductDTO) { }