import { Logger, NotFoundException } from '@nestjs/common';
import { AbstractEntity } from './abstract.entity';
import {
    EntityManager,
    FindOptionsRelations,
    FindOptionsWhere,
    Repository,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export abstract class AbstractRepository<T extends AbstractEntity<T>> {
    protected abstract readonly logger: Logger;

    constructor(
        private readonly itemsRepository: Repository<T>,
        private readonly entityManager: EntityManager,
    ) { }

    async create(entity: T): Promise<T> {
        return this.entityManager.save(entity);
    }

    createQueryBuilder(alias?: string) {
        return this.itemsRepository.createQueryBuilder(alias);
    }

    async findOne(
        where: FindOptionsWhere<T>,
        relations?: FindOptionsRelations<T>,
    ): Promise<T> {
        const entity = await this.itemsRepository.findOne({ where, relations });

        if (!entity) {
            this.logger.warn('Document not found with where', where);
            throw new NotFoundException('Entity not found.');
        }

        return entity;
    }

    async findOneAndUpdate(
        where: FindOptionsWhere<T>,
        partialEntity: QueryDeepPartialEntity<T>,
    ) {
        const updateResult = await this.itemsRepository.update(
            where,
            partialEntity,
        );

        if (!updateResult.affected) {
            this.logger.warn('Entity not found with where', where);
            throw new NotFoundException('Entity not found.');
        }

        return this.findOne(where);
    }

    async findOneOrCreate(
        where: FindOptionsWhere<T>,
        createData: T,
    ): Promise<T> {
        let entity = await this.itemsRepository.findOne({ where });

        if (!entity) {
            entity = await this.entityManager.save(createData);
            return entity;
        }
        return entity;
    }
    async find(where: FindOptionsWhere<T>) {
        return this.itemsRepository.findBy(where);
    }

    async findOneAndDelete(where: FindOptionsWhere<T>) {
        return this.itemsRepository.delete(where);
    }
}