import { Module } from '@nestjs/common';
import { TablesService } from './tables.service';
import { TablesController } from './tables.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Table } from './entities/table.entity';
import { SessionsModule } from 'src/sessions/sessions.module';

@Module({
  controllers: [TablesController],
  providers: [TablesService],
  imports: [TypeOrmModule.forFeature([Table]), SessionsModule],
})
export class TablesModule {}
