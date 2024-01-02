import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository } from '../../database/abstract.repository';
import { Product } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class ProductRepository extends AbstractRepository<Product> {
  protected readonly logger = new Logger(ProductRepository.name);

  constructor(
    @InjectRepository(Product)
    productRepository: Repository<Product>,
    entityManager: EntityManager,
  ) {
    super(productRepository, entityManager);
  }
  async findProductsByQueryParams(
    modelName?: string,
    sizeValue?: string,
    brandName?: string,
    subcategoryName?: string,
    categoryName?: string,
  ): Promise<Product[]> {
    let queryBuilder = this.createQueryBuilder('product');

    if (modelName) {
      queryBuilder = queryBuilder
        .innerJoin('product.productModel', 'model')
        .andWhere('model.modelName = :modelName', { modelName });
    }

    if (sizeValue) {
      queryBuilder = queryBuilder
        .innerJoin('product.sizes', 'size')
        .andWhere('size.sizeValue = :sizeValue', { sizeValue });
    }

    if (brandName) {
      queryBuilder = queryBuilder
        .innerJoin('product.productModel', 'model')
        .innerJoin('model.brand', 'brand')
        .andWhere('brand.brandName = :brandName', { brandName });
    }

    if (subcategoryName) {
      queryBuilder = queryBuilder
        .innerJoin('product.productModel', 'model')
        .innerJoin('model.brand', 'brand')
        .innerJoin('brand.subCategory', 'subcategory')
        .andWhere('subcategory.subCategoryName = :subcategoryName', {
          subcategoryName,
        });
    }
    if (categoryName) {
        console.log(categoryName)
      queryBuilder = queryBuilder
        .innerJoin('product.productModel', 'model')
        .innerJoin('model.brand', 'brand')
        .innerJoin('brand.subCategory', 'subcategory')
        .innerJoin('subcategory.category', 'category')
        .andWhere('category.categoryName = :categoryName', { categoryName });
    }
    return queryBuilder.getMany();
  }
}
