import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDTO } from './category.dto';

export class UpdateCategoryDTO extends PartialType(CreateCategoryDTO) { }