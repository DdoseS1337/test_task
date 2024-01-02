import { Injectable } from '@nestjs/common';
import { SubCategoryRepository } from '../repositories/sub-categories.repository';
import { CreateSubCategoryDTO } from '../dto';
import { SubCategory } from '../entities';
import { UpdateSubCategoryDTO } from '../dto/update-sub-category.dto';
import { CategoryRepository } from '../repositories/category.repository';

@Injectable()
export class SubCategoriesService {
  constructor(
    private readonly subCategoryRepository: SubCategoryRepository,
    private readonly categoryRepository: CategoryRepository,
  ) {}

  async create(createSubCategoryDTO: CreateSubCategoryDTO) {
    if (createSubCategoryDTO.categoryName) {
      const category = await this.categoryRepository.findOne({
        categoryName: createSubCategoryDTO.categoryName,
      });
      const subCategory = new SubCategory({
        subCategoryName: createSubCategoryDTO.subCategoryName,
        category,
      });
      return this.subCategoryRepository.create(subCategory);
    }
    const subCategory = new SubCategory(createSubCategoryDTO);
    return this.subCategoryRepository.create(subCategory);
  }
  async findAll() {
    return this.subCategoryRepository.find({});
  }

  async findOne(id: number) {
    return this.subCategoryRepository.findOne({ id });
  }
  async update(id: number, updateSubCategoryDTO: UpdateSubCategoryDTO) {
    if (updateSubCategoryDTO.categoryName) {
      const category = await this.categoryRepository.findOne({
        categoryName: updateSubCategoryDTO.categoryName,
      });
      return this.subCategoryRepository.findOneAndUpdate(
        { id },
        { subCategoryName: updateSubCategoryDTO.subCategoryName, category },
      );
    }
    return this.subCategoryRepository.findOneAndUpdate(
      { id },
      updateSubCategoryDTO,
    );
  }
}
