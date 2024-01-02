import { PartialType } from '@nestjs/mapped-types';
import { ProductModelDTO } from './product-model.dto'

export class UpdateProductModelDTO extends PartialType(ProductModelDTO) { }