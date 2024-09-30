import { Test, TestingModule } from '@nestjs/testing';
import { TablesController } from './tables.controller';
import { TablesService } from './tables.service';
import { Repository } from 'typeorm';
import { Table } from 'src/tables/entities/table.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SessionsService } from 'src/sessions/sessions.service';
import { Session } from 'src/sessions/entities/session.entity';

describe('TablesController', () => {
  let controller: TablesController;
  let tablesRepository: Repository<Table>;
  let sessionsRepository: Repository<Session>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TablesController],
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
    controller = module.get<TablesController>(TablesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
