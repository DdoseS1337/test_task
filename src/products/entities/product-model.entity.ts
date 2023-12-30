import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { Brand } from './brand.entity';
import { Product } from './product.entity';
import { AbstractEntity } from '../../database/abstract.entity';

@Entity()
export class ProductModel extends AbstractEntity<ProductModel>{
  @Column()
  modelName: string;

  @ManyToOne(() => Brand, brand => brand.productModels, { nullable: true })
  brand: Brand | null;

  @OneToMany(() => Product, product => product.productModel)
  products: Product[];
}
