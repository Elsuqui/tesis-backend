import { Test, TestingModule } from '@nestjs/testing';
import { TablesService } from './tables.service';
import { SessionsService } from 'src/sessions/sessions.service';
import { Repository } from 'typeorm';
import { Table } from 'src/tables/entities/table.entity';
import { Session } from 'src/sessions/entities/session.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('TablesService', () => {
  let service: TablesService;
  let tablesRepository: Repository<Table>;
  let sessionsRepository: Repository<Session>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TablesService,
        SessionsService,
        {
          provide: getRepositoryToken(Table),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Session),
          useClass: Repository,
        },
      ],
    }).compile();

    tablesRepository = module.get<Repository<Table>>(getRepositoryToken(Table));
    sessionsRepository = module.get<Repository<Session>>(
      getRepositoryToken(Session),
    );
    service = module.get<TablesService>(TablesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
