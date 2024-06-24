import { Test, TestingModule } from '@nestjs/testing';
import { SessionsService } from './sessions.service';
import { Repository } from 'typeorm';
import { Session } from 'src/sessions/entities/session.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('SessionsService', () => {
  let service: SessionsService;
  let sessionsRepository: Repository<Session>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SessionsService,
        {
          provide: getRepositoryToken(Session),
          useClass: Repository
        }
      ],
    }).compile();

    sessionsRepository = module.get<Repository<Session>>(
      getRepositoryToken(Session)
    );
    service = module.get<SessionsService>(SessionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
