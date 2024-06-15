import { Audit } from 'src/common/utils/audit.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tables' })
export class Table extends Audit {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('text')
  businessCode: string;
}
