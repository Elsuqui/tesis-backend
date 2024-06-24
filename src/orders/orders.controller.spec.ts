import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { Repository } from 'typeorm';
import { Order } from 'src/orders/entities/order.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SessionsService } from 'src/sessions/sessions.service';
import { Session } from 'src/sessions/entities/session.entity';

describe('OrdersController', () => {
  let ordersController: OrdersController;
  let ordersService: OrdersService;
  let orderRepository: Repository<Order>;
  let sessionRepository: Repository<Session>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [
        OrdersService,
        SessionsService,
        {
          provide: getRepositoryToken(Order),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Session),
          useClass: Repository,
        },
      ],
    }).compile();

    ordersController = module.get<OrdersController>(OrdersController);
    orderRepository = module.get<Repository<Order>>(
      getRepositoryToken(Order),
    );
    sessionRepository = module.get<Repository<Session>>(
      getRepositoryToken(Session),
    );
    ordersService = module.get<OrdersService>(OrdersService);
  });

  it('should be defined', () => {
    expect(ordersController).toBeDefined();
  });



  // Add more test cases for other controller methods (findAll, findOne, etc.)
});
