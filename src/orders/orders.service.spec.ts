import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { SessionsService } from 'src/sessions/sessions.service';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Session } from 'src/sessions/entities/session.entity';

describe('OrdersService', () => {
  let ordersService: OrdersService;
  let ordersRepository: Repository<Order>;

  let sessionRepository: Repository<Session>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    ordersService = module.get<OrdersService>(OrdersService);
    ordersRepository = module.get<Repository<Order>>(getRepositoryToken(Order));
    sessionRepository = module.get<Repository<Session>>(
      getRepositoryToken(Session),
    );
  });

  it('should be defined', () => {
    expect(ordersService).toBeDefined();
  });
});
