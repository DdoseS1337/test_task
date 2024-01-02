import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository } from '../../database/abstract.repository';
import { SubCategory } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class SubCategoryRepository extends AbstractRepository<SubCategory> {
    protected readonly logger = new Logger(SubCategoryRepository.name);

    constructor(
        @InjectRepository(SubCategory)
        subCategoryRepository: Repository<SubCategory>,
        entityManager: EntityManager,
    ) {
        super(subCategoryRepository, entityManager);
    }
}