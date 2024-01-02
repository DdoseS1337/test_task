import { PartialType } from '@nestjs/mapped-types';
import { CreateSubCategoryDTO } from './sub-category.dto';

export class UpdateSubCategoryDTO extends PartialType(CreateSubCategoryDTO) { }