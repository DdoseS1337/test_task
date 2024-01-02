import { Injectable } from '@nestjs/common';
import { SizeRepository } from '../repositories';
import { SizeDTO } from '../dto';
import { Size } from '../entities';

@Injectable()
export class SizesService {
  constructor(private readonly sizeRepository: SizeRepository) {}

  async create(sizeDto: SizeDTO) {
    const size = new Size(sizeDto);
    return this.sizeRepository.create(size);
  }
  async findAll() {
    return this.sizeRepository.find({});
  }

  async findOne(id: number) {
    return this.sizeRepository.findOne({ id });
  }
  async update(id: number, updateProductDTO: any) {
    return this.sizeRepository.findOneAndUpdate({ id }, updateProductDTO);
  }
}
