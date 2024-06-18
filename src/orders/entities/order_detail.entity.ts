import { Audit } from 'src/common/utils/audit.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from './order.entity';
import { Product } from 'src/products/entities/product.entity';

@Entity({ name: 'order_details' })
export class OrderDetail extends Audit {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;
  @Column('uuid')
  orderUuid: string;
  @Column('numeric')
  productId: number;
  @Column('float')
  price: number;
  @Column('integer')
  quantity: number;
  // TODO: Add a dispatch flag to know if the order detail has been dispatched
  @ManyToOne(() => Order, (order) => order.orderDetails)
  @JoinColumn({ name: 'orderUuid' })
  order: Order;
  @ManyToOne(() => Product) // Define only one side of the relationship
  @JoinColumn({ name: 'productId' })
  product: Product;
}
