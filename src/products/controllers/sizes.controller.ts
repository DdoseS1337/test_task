import { Controller, Delete, Get, Param } from '@nestjs/common';
import { SizesService } from '../services';

@Controller('sizes')
export class SizesController {

    constructor(private readonly sizesService: SizesService) { }

    @Get()
    async getAllProduct() {
        return this.sizesService.findAll();
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
      return this.sizesService.remove(+id);
    }
}
