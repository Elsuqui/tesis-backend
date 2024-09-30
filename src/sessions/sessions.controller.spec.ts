import { Test, TestingModule } from '@nestjs/testing';
import { SessionsController } from './sessions.controller';
import { SessionsService } from './sessions.service';
import { Repository } from 'typeorm';
import { Session } from 'src/sessions/entities/session.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('SessionsController', () => {
  let controller: SessionsController;
  let sessionsRepository: Repository<Session>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SessionsController],
      providers: [
        SessionsService,
        {
          provide: getRepositoryToken(Session),
          useClass: Repository,
        },
      ],
    }).compile();

    sessionsRepository = module.get<Repository<Session>>(
      getRepositoryToken(Session),
    );
    controller = module.get<SessionsController>(SessionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
