import { Injectable } from '@nestjs/common';
import { ProductModelRepository } from '../repositories';

@Injectable()
export class ProductModelsService {
    constructor(private readonly productModelRepository: ProductModelRepository) { }

    async create(product: any) {
        return product
        // return this.productRepository.create(product)
    }

    async findAll() {
        return this.productModelRepository.find({});
    }
}
