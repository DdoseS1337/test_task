import { Module } from '@nestjs/common';
import { ProductsController } from './controllers/products.controller';
import { DatabaseModule } from '../database/database.module';
import {
  Brand,
  Category,
  Product,
  ProductModel,
  Size,
  SubCategory,
} from './entities';
import {
  ProductModelsService,
  ProductsService,
  SizesService,
} from './services';
import {
  ProductRepository,
  ProductModelRepository,
  SizeRepository,
  SubCategoryRepository,
} from './repositories';
import { SizesController } from './controllers/sizes.controller';
import { ProductModelsController } from './controllers/product-models.controller';
import { BrandController } from './controllers/brands.controller';
import { BrandsService } from './services/brands.service';
import { BrandsRepository } from './repositories/brand.repository';
import { SubCategoriesController } from './controllers/sub-categories.controller';
import { CategoriesController } from './controllers/categories.controller';
import { SubCategoriesService } from './services/sub-categories.service';
import { CategoriesService } from './services/categories.service';
import { CategoryRepository } from './repositories/category.repository';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([
      Brand,
      ProductModel,
      Product,
      Category,
      Size,
      SubCategory,
    ]),
  ],
  controllers: [
    BrandController,
    ProductsController,
    ProductModelsController,
    SizesController,
    SubCategoriesController,
    CategoriesController,
  ],
  providers: [
    BrandsService,
    BrandsRepository,
    ProductsService,
    ProductModelsService,
    SizesService,
    ProductRepository,
    ProductModelRepository,
    SizeRepository,
    SubCategoryRepository,
    SubCategoriesService,
    CategoriesService,
    CategoryRepository,
  ],
  exports: [ProductsService, ProductModelsService, SizesService],
})
export class ProductsModule {}
