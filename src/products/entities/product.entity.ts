
import { Entity, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { ProductModel } from './product-model.entity';
import { Size } from './size.entity';
import { AbstractEntity } from '../../database/abstract.entity';

@Entity()
export class Product extends AbstractEntity<Product>{
  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  code: number;

  @ManyToOne(() => ProductModel, productModel => productModel.products)
  productModel: ProductModel;

  @ManyToMany(() => Size, size => size.products)
  @JoinTable()
  sizes: Size[];
}
