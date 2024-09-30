import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateTableDto } from './dto/update-table.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTableDto } from './dto/create-table.dto';
import { Table } from './entities/table.entity';
import { SessionsService } from 'src/sessions/sessions.service';
import { SyncTableDto } from './dto/sync-table.dto';
import { SessionNotFoundError } from 'src/sessions/exceptions/sessionNotFoundError';

@Injectable()
export class TablesService {
  constructor(
    @InjectRepository(Table)
    private readonly tableRepository: Repository<Table>,
    private readonly sessionService: SessionsService,
  ) {}

  create(createTableDto: CreateTableDto) {
    const table = this.tableRepository.create(createTableDto);
    return this.tableRepository.save(table);
  }

  async findAll() {
    const tables = await this.tableRepository.find();
    return tables;
  }

  async findOne(id: number) {
    const table = await this.tableRepository.findOneBy({ id });
    if (!table) {
      throw new NotFoundException(`Table #${id} not found`);
    }
    return table;
  }

  async update(id: number, updateTableDto: UpdateTableDto) {
    const table = await this.tableRepository.preload({
      id,
      ...updateTableDto,
    });
    if (!table) {
      throw new NotFoundException(`Table #${id} not found`);
    }
    return this.tableRepository.save(table);
  }

  async remove(id: number) {
    const table = await this.findOne(id);
    return this.tableRepository.softRemove(table);
  }

  async tableSync(id: number, syncTableDto: SyncTableDto) {
    const existingSession =
      await this.sessionService.findActiveSessionByTableId(id);
    if (!existingSession) {
      const session = this.sessionService.create({
        tableId: id,
        issuedBy: syncTableDto.issuedBy,
        phoneManufacturer: syncTableDto.phoneManufacturer,
      });
      return session;
    }
    // Neeew code
    // Check if the session belongs to the same user issued the sync request
    if (existingSession.issuedBy !== syncTableDto.issuedBy) {
      const session = this.sessionService.create({
        tableId: id,
        issuedBy: syncTableDto.issuedBy,
        phoneManufacturer: syncTableDto.phoneManufacturer,
      });
      return session;
    }
    //******** */
    return await this.sessionService.extendSession(existingSession.uuid);
  }

  async checkSessionExpirationByTable(id: number) {
    try {
      const session = await this.sessionService.findActiveSessionByTableId(id);
      if (!session) {
        throw new SessionNotFoundError();
      }
      return await this.sessionService.checkSessionExpiration(session.uuid);
    } catch (error) {
      if (error instanceof SessionNotFoundError) {
        throw new NotFoundException('Table has no active session');
      }
    }
  }
}
