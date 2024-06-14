import { Audit } from 'src/common/extendable/entities/audit.entity';
import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MenuDetail } from './menu_detail.entity';

@Entity({
  name: 'menus',
})
export class Menu extends Audit {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('text')
  @Index({ unique: true, where: '"deletedAt" IS NULL' })
  name: string;
  @Column('text', { nullable: true })
  description?: string;
  @Column('boolean', { default: true })
  isActive: boolean;
  @OneToMany(() => MenuDetail, (menuDetail) => menuDetail.menu, {
    cascade: ['insert', 'update'],
  })
  menuDetails: MenuDetail[];
}
