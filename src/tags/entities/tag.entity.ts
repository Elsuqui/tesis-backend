import { Audit } from 'src/common/extendable/entities/audit.entity';
import { MenuDetail } from 'src/menus/entities/menu_detail.entity';
import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'tags' })
export class Tag extends Audit {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('text')
  @Index({ unique: true, where: '"deletedAt" IS NULL' })
  name: string;
  @OneToMany(() => MenuDetail, (menuDetail) => menuDetail.tag)
  menuDetails: MenuDetail[];
}
