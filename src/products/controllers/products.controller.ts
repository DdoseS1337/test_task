import { Body, Controller, Delete, Get, Param, Patch, Query } from '@nestjs/common';
import { ProductsService } from '../services';
import { UpdateProductDTO } from '../dto/update-product.dto';
import { QueryValidator } from '../dto/query.dto';

@Controller('products')
export class ProductsController {

    constructor(private readonly productsService: ProductsService) { }

    // @Get()
    // async getAllProduct() {
    //     return this.productsService.findAll();
    // }

    @Get(':id')
    async findOne(@Param('id') id: string) {
      return this.productsService.findOne(+id);
    }

    @Get()
    async getAllProduct(@Query() query: QueryValidator) {
      let options = {...query}
      return this.productsService.findProductsByModelAndSize(options);
    }

    @Patch(':id')
    async update(
      @Param('id') id: string,
      @Body() updateProductDTO: UpdateProductDTO,
    ) {
      return this.productsService.update(+id, updateProductDTO);
    }
  
    @Delete(':id')
    async remove(@Param('id') id: string) {
      return this.productsService.remove(+id);
    }
}
