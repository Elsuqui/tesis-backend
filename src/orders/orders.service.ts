import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { CalculateOrderDetailDto } from './dto/calculate-order-detail.dto';
import { SessionsService } from 'src/sessions/sessions.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly sessionService: SessionsService,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    // Check if session is expired
    const currentSession = await this.sessionService.findOne(
      createOrderDto.sessionUuid,
    );
    if (!currentSession) {
      throw new NotFoundException('Session not found');
    }
    if (currentSession.isExpired()) {
      throw new UnauthorizedException('Session is expired');
    }
    // Check if the order details are empty
    if (createOrderDto.orderDetails.length === 0) {
      throw new UnprocessableEntityException('Order details are required');
    }
    const order = this.orderRepository.create(createOrderDto);
    // Get the total amount of the order
    const total = this.calculateTotal(createOrderDto.orderDetails);
    // Get the last order record to get the secuential number
    const lastOrder = await this.getLastOrderRecord();
    const secuential = lastOrder ? lastOrder.secuential + 1 : 1;
    // Set a limit of 100 orders as secuential number
    order.secuential = secuential === 100 ? 1 : secuential;
    order.total = total;
    const result = await this.orderRepository.manager.transaction(
      async (transactionalEntityManager) => {
        const savedOrder = await transactionalEntityManager.save(order);
        // Save the order details
        await transactionalEntityManager
          .createQueryBuilder()
          .relation(Order, 'orderDetails') // Define the relation
          .of(savedOrder) // Define the current order
          .add(createOrderDto.orderDetails); // Use add for one to many relations;
        return savedOrder;
      },
    );
    return result;
  }

  async findAll() {
    const orders = await this.orderRepository.find({
      relations: ['orderDetails'],
    });
    return orders;
  }

  findOne(id: string) {
    const order = this.orderRepository.findOne({
      where: { uuid: id },
      relations: {
        orderDetails: {
          product: true,
        },
      },
    });
    if (!order) {
      throw new NotFoundException(`Order #${id} not found`);
    }
    return order;
  }

  // TODO: Future implementation
  // update(id: number, updateOrderDto: UpdateOrderDto) {
  //   throw new Error('Method not implemented.');
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} order`;
  // }

  calculateTotal(orderDetails: CalculateOrderDetailDto[]) {
    return orderDetails.reduce((acc, orderDetail) => {
      return acc + orderDetail.price * orderDetail.quantity;
    }, 0);
  }

  getLastOrderRecord() {
    return this.orderRepository.findOne({
      where: {},
      order: { createdAt: 'DESC' },
    });
  }
}
