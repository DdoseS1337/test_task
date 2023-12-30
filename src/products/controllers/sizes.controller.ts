import { Controller, Get } from '@nestjs/common';
import { SizesService } from '../services';

@Controller('sizes')
export class SizesController {

    constructor(private readonly sizesService: SizesService) { }

    @Get()
    async getAllProduct() {
        return this.sizesService.findAll();
    }
}
