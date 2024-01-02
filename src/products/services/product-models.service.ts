import { Injectable } from '@nestjs/common';
import { BrandsRepository, ProductModelRepository } from '../repositories';
import { UpdateProductModelDTO } from '../dto/update-product-model.dto';
import { ProductModelDTO } from '../dto';
import { ProductModel } from '../entities';

@Injectable()
export class ProductModelsService {
  constructor(
    private readonly productModelRepository: ProductModelRepository,
    private readonly brandsRepository: BrandsRepository,
  ) {}

  async create(productModelDTO: ProductModelDTO) {
    if (productModelDTO.brandName) {
      const brand = await this.brandsRepository.findOne({
        brandName: productModelDTO.brandName,
      });
      const product = new ProductModel({
        modelName: productModelDTO.modelName,
        brand,
      });
      await this.productModelRepository.create(product);
    }
  }
  async findAll() {
    return this.productModelRepository.find({});
  }

  async findOne(id: number) {
    return this.productModelRepository.findOne({ id });
  }

  async update(id: number, updateproductModelDTO: UpdateProductModelDTO) {
    if (updateproductModelDTO.brandName) {
      const brand = await this.brandsRepository.findOne({
        brandName: updateproductModelDTO.brandName,
      });
      return this.productModelRepository.findOneAndUpdate(
        { id },
        { modelName: updateproductModelDTO.modelName, brand },
      );
    }
    return this.productModelRepository.findOneAndUpdate(
      { id },
      updateproductModelDTO,
    );
  }
}
