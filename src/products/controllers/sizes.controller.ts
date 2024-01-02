import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { SizesService } from '../services';
import { SizeDTO } from '../dto/size.dto';

@Controller('sizes')
export class SizesController {

    constructor(private readonly sizesService: SizesService) { }

    @Get()
    async getAllProductModel() {
        return this.sizesService.findAll();
    }
    @Post()
    async create(
        @Body() sizeDto: SizeDTO,
    ) {
        return this.sizesService.create(sizeDto);
    }

    @Get()
    async findAll() {
        return this.sizesService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.sizesService.findOne(+id);
    }

    @Patch(':id')
    async update(
        @Param('id') id: string,
        @Body() updateReservationDto: any,
    ) {
        return this.sizesService.update(+id, updateReservationDto);
    }
}
