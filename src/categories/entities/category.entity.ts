import { Audit } from 'src/common/utils/audit.entity';
import { Product } from 'src/products/entities/product.entity';
import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'categories' })
export class Category extends Audit {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('text')
  @Index({ unique: true, where: '"deletedAt" IS NULL' })
  name: string;
  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
