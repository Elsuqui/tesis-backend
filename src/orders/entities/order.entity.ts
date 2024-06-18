import { Audit } from 'src/common/utils/audit.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OrderDetail } from './order_detail.entity';

@Entity({ name: 'orders' })
export class Order extends Audit {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;
  @Column('uuid')
  sessionUuid: string;
  @Column('integer')
  secuential: number;
  @Column('float')
  total: number;
  @Column('text', { default: 'pending' })
  status: string;
  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.order, {
    cascade: ['insert'],
  })
  orderDetails: OrderDetail[];
}
