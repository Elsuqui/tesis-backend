import { Audit } from 'src/common/utils/audit.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Table } from 'src/tables/entities/table.entity';

@Entity({ name: 'sessions' })
export class Session extends Audit {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;
  @Column('numeric')
  tableId: number;
  @Column('text', { default: 'running' })
  status: string;
  @Column('text')
  issuedBy: string; // This is a unique phone identifier
  @Column('text')
  phoneManufacturer: string; // This is the phone manufacturer
  @Column('timestamp')
  expiresAt: Date;
  @ManyToOne(() => Table)
  @JoinColumn({ name: 'tableId' })
  table: Table;

  isExpired(): boolean {
    return this.expiresAt < new Date();
  }
}
