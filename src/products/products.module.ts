import { Module } from '@nestjs/common';
import { ProductsController } from './controllers/products.controller';
import { DatabaseModule } from '../database/database.module';
import { Brand, Category, Product, ProductModel, Size, SubCategory } from './entities';
import { ProductModelsService, ProductsService, SizesService } from './services';
import { ProductRepository, ProductModelRepository, SizeRepository } from './repositories';
import { SizesController } from './controllers/sizes.controller';
import { ProductModelsController } from './controllers/product-models.controller';

@Module({
  imports: [DatabaseModule, DatabaseModule.forFeature([
    Brand,
    ProductModel,
    Product,
    Category,
    Size,
    SubCategory])],
  controllers: [
    ProductsController,
    ProductModelsController,
    SizesController],
  providers: [
    ProductsService,
    ProductModelsService,
    SizesService,
    ProductRepository,
    ProductModelRepository,
    SizeRepository],
  exports: [ProductsService, ProductModelsService, SizesService]
})
export class ProductsModule { }
