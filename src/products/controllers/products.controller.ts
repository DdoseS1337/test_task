import { Body, Controller, Delete, Get, Param, Patch, Query } from '@nestjs/common';
import { ProductsService } from '../services';
import { UpdateProductDTO } from '../dto/update-product.dto';
import { QueryValidator } from '../dto/query.dto';

@Controller('products')
export class ProductsController {

    constructor(private readonly productsService: ProductsService) { }

    @Get(':id')
    async findOne(@Param('id') id: string) {
      return this.productsService.findOne(+id);
    }

    @Get()
    async getAllProduct(@Query() query: QueryValidator) {
      let options = {...query}
      return this.productsService.findProductsByQueryParams(options);
    }

    @Patch(':id')
    async update(
      @Param('id') id: string,
      @Body() updateProductDTO: UpdateProductDTO,
    ) {
      return this.productsService.update(+id, updateProductDTO);
    }

}
