import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import { Product } from './product.entity';
import { AbstractEntity } from '../../database/abstract.entity';

@Entity()
export class Size extends AbstractEntity<Size>{
    @Column()
    sizeValue: string;

    @ManyToMany(() => Product, product => product.sizes)
    @JoinTable()
    products: Product[];
}
