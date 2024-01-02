import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ProductModelsService } from '../services';
import { UpdateProductModelDTO } from '../dto/update-product-model.dto';
import { ProductModelDTO } from '../dto';

@Controller('models')
export class ProductModelsController {

    constructor(private readonly productModelsService: ProductModelsService) { }
    @Get()
    async getAllProductModel() {
        return this.productModelsService.findAll();
    }
    @Post()
    async create(
      @Body() productModelDTO: ProductModelDTO,
    ) {
      return this.productModelsService.create(productModelDTO);
    }
  
    @Get()
    async findAll() {
      return this.productModelsService.findAll();
    }
  
    @Get(':id')
    async findOne(@Param('id') id: string) {
      return this.productModelsService.findOne(+id);
    }
  
    @Patch(':id')
    async update(
      @Param('id') id: string,
      @Body() updateProductModelDTO: UpdateProductModelDTO,
    ) {
      return this.productModelsService.update(+id, updateProductModelDTO);
    }
  
    @Delete(':id')
    async remove(@Param('id') id: string) {
    //   return this.productModelsService.remove(+id);
    }

}
