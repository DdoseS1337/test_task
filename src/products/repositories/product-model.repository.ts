import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository } from '../../database/abstract.repository';
import { ProductModel } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class ProductModelRepository extends AbstractRepository<ProductModel> {
    protected readonly logger = new Logger(ProductModelRepository.name);

    constructor(
        @InjectRepository(ProductModel)
        productModelRepository: Repository<ProductModel>,
        entityManager: EntityManager,
    ) {
        super(productModelRepository, entityManager);
    }
}