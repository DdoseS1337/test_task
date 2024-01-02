import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { BrandsService } from '../services/brands.service';
import { CreateBrandDTO, UpdateBrandDTO } from '../dto';

@Controller('brands')
export class BrandController {

    constructor(private readonly brandsService: BrandsService) { }
    @Get()
    async getAllProductModel() {
        return this.brandsService.findAll();
    }
    @Post()
    async create(
      @Body() createBrandDTO: CreateBrandDTO,
    ) {
      return this.brandsService.create(createBrandDTO);
    }
  
    @Get()
    async findAll() {
      return this.brandsService.findAll();
    }
  
    @Get(':id')
    async findOne(@Param('id') id: string) {
      return this.brandsService.findOne(+id);
    }
  
    @Patch(':id')
    async update(
      @Param('id') id: string,
      @Body() updateBrandDTO: UpdateBrandDTO,
    ) {
      return this.brandsService.update(+id, updateBrandDTO);
    }

}
