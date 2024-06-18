import { Category } from 'src/categories/entities/category.entity';
import { Audit } from 'src/common/utils/audit.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'products' })
export class Product extends Audit {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('text')
  @Index({ unique: true, where: '"deletedAt" IS NULL' })
  name: string;
  @Column('text', { nullable: true })
  description?: string;
  @Column('text', { nullable: true })
  image_url?: string;
  @Column('float')
  price: number;
  @Column('numeric', {
    nullable: false,
  })
  categoryId: number;
  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: 'categoryId' })
  category: Category;
}
