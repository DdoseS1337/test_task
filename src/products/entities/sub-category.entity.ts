import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { Category } from './category.entity';
import { Brand } from './brand.entity';
import { AbstractEntity } from '../../database/abstract.entity';

@Entity()
export class SubCategory extends AbstractEntity<SubCategory>{
  @Column()
  subCategoryName: string;

  @ManyToOne(() => Category, category => category.subCategories)
  category: Category;

  @OneToMany(() => Brand, brand => brand.subCategory, { nullable: true })
  brands: Brand[] | null;
}
