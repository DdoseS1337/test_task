import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CategoriesService } from '../services/categories.service';
import { CreateCategoryDTO } from '../dto/category.dto';
import { UpdateCategoryDTO } from '../dto/update-category.dto';

@Controller('categories')
export class CategoriesController {

    constructor(private readonly categoriesService: CategoriesService) { }
    @Get()
    async getAllProductModel() {
        return this.categoriesService.findAll();
    }
    @Post()
    async create(
      @Body() createCategoryDTO: CreateCategoryDTO,
    ) {
      return this.categoriesService.create(createCategoryDTO);
    }
  
    @Get()
    async findAll() {
      return this.categoriesService.findAll();
    }
  
    @Get(':id')
    async findOne(@Param('id') id: string) {
      return this.categoriesService.findOne(+id);
    }
  
    @Patch(':id')
    async update(
      @Param('id') id: string,
      @Body() updateCategoryDTO: UpdateCategoryDTO,
    ) {
      return this.categoriesService.update(+id, updateCategoryDTO);
    }
  
}
