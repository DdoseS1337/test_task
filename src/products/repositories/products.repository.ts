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
    async findProductsByModelAndSize(modelName?: string, sizeValue?: string): Promise<Product[]> {
        let queryBuilder = this.createQueryBuilder('product');

        if (modelName && sizeValue) {
            queryBuilder = queryBuilder
                .innerJoin('product.sizes', 'size')
                .innerJoin('product.productModel', 'model')
                .where('model.modelName = :modelName', { modelName })
                .andWhere('size.sizeValue = :sizeValue', { sizeValue });
        } else if (modelName) {
            queryBuilder = queryBuilder
                .innerJoin('product.productModel', 'model')
                .where('model.modelName = :modelName', { modelName });
        } else if (sizeValue) {
            queryBuilder = queryBuilder
                .innerJoin('product.sizes', 'size')
                .where('size.sizeValue = :sizeValue', { sizeValue });
        }

        return queryBuilder.getMany();
    }
}