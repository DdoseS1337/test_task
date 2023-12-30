import { Controller, Get } from '@nestjs/common';
import { ProductModelsService } from '../services';

@Controller('models')
export class ProductModelsController {

    constructor(private readonly productModelsService: ProductModelsService) { }
    @Get()
    async getAllProduct() {
        return this.productModelsService.findAll();
    }
}
