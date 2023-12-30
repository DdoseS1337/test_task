import { Controller, Delete, Get, Param } from '@nestjs/common';
import { ProductsService } from '../services';

@Controller('products')
export class ProductsController {

    constructor(private readonly productsService: ProductsService) { }

    @Get()
    async getAllProduct() {
        return this.productsService.findAll();
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
      return this.productsService.remove(+id);
    }
}
