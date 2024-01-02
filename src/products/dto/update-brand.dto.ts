import { PartialType } from '@nestjs/mapped-types';
import { CreateBrandDTO } from './brand.dto'

export class UpdateBrandDTO extends PartialType(CreateBrandDTO) { }