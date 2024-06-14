import { Category } from 'src/categories/entities/category.entity';
import { Audit } from 'src/common/extendable/entities/audit.entity';
import { MenuDetail } from 'src/menus/entities/menu_detail.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'products',
})
export class Product extends Audit {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('text')
  @Index({ unique: true, where: '"deletedAt" IS NULL' })
  name: string;
  @Column('text', { nullable: true })
  description: string;
  @Column('float')
  price: number;
  @Column('numeric', {
    nullable: false,
  })
  categoryId: number;
  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: 'categoryId' })
  category: Category;
  @OneToMany(() => MenuDetail, (menuDetail) => menuDetail.product)
  menuDetails: MenuDetail[];
}
