// Brand.entity.ts
import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { SubCategory } from './sub-category.entity';
import { ProductModel } from './product-model.entity';
import { AbstractEntity } from '../../database/abstract.entity';

@Entity()
export class Brand extends AbstractEntity<Brand>{

  @Column()
  brandName: string;

  @ManyToOne(() => SubCategory, subCategory => subCategory.brands)
  subCategory: SubCategory;

  @OneToMany(() => ProductModel, productModel => productModel.brand)
  productModels: ProductModel[];
}
