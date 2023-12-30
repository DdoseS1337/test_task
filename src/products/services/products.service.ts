import { Injectable } from '@nestjs/common';
import { ProductModelRepository, ProductRepository, SizeRepository } from '../repositories';
import { ProductDTO } from '../dto/product.dto';
import { Product, ProductModel, Size } from '../entities';

@Injectable()
export class ProductsService {
    constructor(private readonly productRepository: ProductRepository,
        private readonly productModelRepository: ProductModelRepository,
        private readonly sizeRepository: SizeRepository) { }

    async create(data: ProductDTO[]) {
        try {
            for (const productData of data) {
                // 1. Створіть або знайдіть ProductModel
                const productmodelEntity = new ProductModel({ modelName: productData.productModel.modelName, })
                const productModel = await this.productModelRepository.findOneOrCreate({ modelName: productData.productModel.modelName }, productmodelEntity);
                const sizes = [];
                // 2. Створіть або знайдіть розмір для кожного розміру, що міститься в ProductDTO
                for (const sizeValue of productData.sizes) {
                    const sizeEntity = new Size({ sizeValue })
                    const size = await this.sizeRepository.findOneOrCreate({ sizeValue }, sizeEntity);
                    sizes.push(size);
                }

                try {
                    const existingProduct = await this.productRepository.findOne({ code: productData.code, name: productData.name });
                    if (existingProduct) {

                        const product = new Product({
                            ...existingProduct,
                            sizes: sizes,
                            productModel: productModel
                        })
                        await this.productRepository.create(product)

                    }
                } catch (error) {
                    console.log(error)
                    // Створіть новий об'єкт продукту з використанням ProductModel та розмірів
                    const product = new Product({
                        ...productData,
                        sizes: sizes,
                        productModel: productModel
                    })
                    await this.productRepository.create(product);
                }
            }
            return
        } catch (error) {
            console.error(`Error fetching data from sheet:`, error);
            throw new Error(`Error fetching data from sheet `);
        }

    }

    async findAll() {
        return this.productRepository.find({});
    }

    async findOne(id: number) {
        return this.productRepository.findOne({ id });
    }

    async update(id: number, updateReservationDto: any) {
        return this.productRepository.findOneAndUpdate(
            { id },
            updateReservationDto,
        );
    }

    async remove(id: number) {
        return this.productRepository.findOneAndDelete({ id });
    }
}
