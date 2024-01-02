import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { SubCategoriesService } from '../services/sub-categories.service';
import { CreateSubCategoryDTO } from '../dto'
import { UpdateSubCategoryDTO } from '../dto/update-sub-category.dto';

@Controller('subcategories')
export class SubCategoriesController {

    constructor(private readonly subCategoriesService: SubCategoriesService) { }
    @Get()
    async getAllProductModel() {
        return this.subCategoriesService.findAll();
    }
    @Post()
    async create(
        @Body() createSubCategoryDTO: CreateSubCategoryDTO,
    ) {
        return this.subCategoriesService.create(createSubCategoryDTO);
    }

    @Get()
    async findAll() {
        return this.subCategoriesService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.subCategoriesService.findOne(+id);
    }

    @Patch(':id')
    async update(
        @Param('id') id: string,
        @Body() updateSubCategoryDTO: UpdateSubCategoryDTO,
    ) {
        return this.subCategoriesService.update(+id, updateSubCategoryDTO);
    }
}
