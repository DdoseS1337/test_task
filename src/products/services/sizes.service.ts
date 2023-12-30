import { Injectable } from '@nestjs/common';
import { SizeRepository } from '../repositories';

@Injectable()
export class SizesService {
    constructor(private readonly sizeRepository: SizeRepository) { }

    async create(product: any) {
    }
 
    async findAll() {
        return this.sizeRepository.find({});
    }
}
