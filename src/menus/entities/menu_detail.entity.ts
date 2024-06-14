import { Audit } from 'src/common/extendable/entities/audit.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Menu } from './menu.entity';
import { Product } from 'src/products/entities/product.entity';
import { Tag } from 'src/tags/entities/tag.entity';

@Entity({ name: 'menu_details' })
export class MenuDetail extends Audit {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('numeric')
  productId: number;
  @ManyToOne(() => Product, (product) => product.menuDetails)
  @JoinColumn({ name: 'productId' })
  product: Product;
  @Column('numeric')
  tagId: number;
  @ManyToOne(() => Tag, (tag) => tag.menuDetails)
  @JoinColumn({ name: 'tagId' })
  tag: Tag;
  @Column('numeric')
  menuId: number;
  @ManyToOne(() => Menu, (menu) => menu.menuDetails)
  @JoinColumn({ name: 'menuId' })
  menu: Menu;
}
