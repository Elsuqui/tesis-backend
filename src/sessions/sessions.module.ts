import { Module } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { SessionsController } from './sessions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Session } from './entities/session.entity';

@Module({
  controllers: [SessionsController],
  providers: [SessionsService],
  imports: [TypeOrmModule.forFeature([Session])],
  exports: [SessionsService],
})
export class SessionsModule {}
