import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository } from '../../database/abstract.repository';
import { Size } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class SizeRepository extends AbstractRepository<Size> {
    protected readonly logger = new Logger(SizeRepository.name);

    constructor(
        @InjectRepository(Size)
        sizeRepository: Repository<Size>,
        entityManager: EntityManager,
    ) {
        super(sizeRepository, entityManager);
    }
}