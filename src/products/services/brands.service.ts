import { Injectable } from '@nestjs/common';
import { BrandsRepository } from '../repositories/brand.repository';
import { CreateBrandDTO } from '../dto/brand.dto';
import { Brand } from '../entities';
import { UpdateBrandDTO } from '../dto';
import { SubCategoryRepository } from '../repositories/sub-categories.repository';
@Injectable()
export class BrandsService {
  constructor(
    private readonly brandsRepository: BrandsRepository,
    private readonly subCategoryRepository: SubCategoryRepository,
  ) {}
  async create(createBrandDTO: CreateBrandDTO) {
    if (createBrandDTO.subCategoryName) {
      const subCategory = await this.subCategoryRepository.findOne({
        subCategoryName: createBrandDTO.subCategoryName,
      });

      const brand = new Brand({
        brandName: createBrandDTO.brandName,
        subCategory,
      });
      return this.brandsRepository.create(brand);
    }
    const brand = new Brand(createBrandDTO);
    return this.brandsRepository.create(brand);
  }
  async findAll() {
    return this.brandsRepository.find({});
  }

  async findOne(id: number) {
    return this.brandsRepository.findOne({ id });
  }
  async update(id: number, updateBrandDTO: UpdateBrandDTO) {
    if (updateBrandDTO.subCategoryName) {
      const subCategory = await this.subCategoryRepository.findOne({
        subCategoryName: updateBrandDTO.subCategoryName,
      });
      return this.brandsRepository.findOneAndUpdate(
        { id },
        { brandName: updateBrandDTO.brandName, subCategory },
      );
    }
    return this.brandsRepository.findOneAndUpdate({ id }, updateBrandDTO);
  }
}
