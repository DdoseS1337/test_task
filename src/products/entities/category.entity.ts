import { Entity, Column, OneToMany } from 'typeorm';
import { SubCategory } from './sub-category.entity';
import { AbstractEntity } from '../../database/abstract.entity';

@Entity()
export class Category extends AbstractEntity<Category>{
    @Column()
    categoryName: string;

    @OneToMany(() => SubCategory, subCategory => subCategory.category, { nullable: true })
    subCategories: SubCategory[] | null;
}
