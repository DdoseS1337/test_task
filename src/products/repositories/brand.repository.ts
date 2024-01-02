import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository } from '../../database/abstract.repository';
import { Brand } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class BrandsRepository extends AbstractRepository<Brand> {
    protected readonly logger = new Logger(BrandsRepository.name);

    constructor(
        @InjectRepository(Brand)
        brandRepository: Repository<Brand>,
        entityManager: EntityManager,
    ) {
        super(brandRepository, entityManager);
    }
}