import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository } from '../../database/abstract.repository';
import { Category } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class CategoryRepository extends AbstractRepository<Category> {
    protected readonly logger = new Logger(CategoryRepository.name);

    constructor(
        @InjectRepository(Category)
        categoryRepository: Repository<Category>,
        entityManager: EntityManager,
    ) {
        super(categoryRepository, entityManager);
    }
}