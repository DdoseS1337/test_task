import { Injectable } from '@nestjs/common';
import { CategoryRepository } from '../repositories/category.repository';
import { CreateCategoryDTO } from '../dto/category.dto';
import { Category } from '../entities';
import { UpdateCategoryDTO } from '../dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoryRepository: CategoryRepository) {}
  async create(createCategoryDTO: CreateCategoryDTO) {
    const category = new Category(createCategoryDTO);
    return this.categoryRepository.create(category);
  }
  async findAll() {
    return this.categoryRepository.find({});
  }

  async findOne(id: number) {
    return this.categoryRepository.findOne({ id });
  }
  async update(id: number, updateCategoryDTO: UpdateCategoryDTO) {
    return this.categoryRepository.findOneAndUpdate({ id }, updateCategoryDTO);
  }
}
