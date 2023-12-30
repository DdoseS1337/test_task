import { Injectable } from '@nestjs/common';
import { SizeRepository } from '../repositories';

@Injectable()
export class SizesService {
    constructor(private readonly sizeRepository: SizeRepository) { }

    

    async findAll() {
        return this.sizeRepository.find({});
    }

    async remove(id: number) {
        return this.sizeRepository.findOneAndDelete({ id });
    }
}
