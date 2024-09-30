import { Injectable } from '@nestjs/common';
import { CreateSessionDto } from './dto/create-session.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Session } from './entities/session.entity';
import { Raw, Repository } from 'typeorm';
import { SessionNotFoundError } from './exceptions/sessionNotFoundError';

@Injectable()
export class SessionsService {
  constructor(
    @InjectRepository(Session)
    private readonly sessionRepository: Repository<Session>,
  ) {}

  create(createSessionDto: CreateSessionDto) {
    const session = this.sessionRepository.create(createSessionDto);
    const expirationDate = new Date();
    expirationDate.setHours(expirationDate.getHours() + 4);
    session.expiresAt = expirationDate;
    return this.sessionRepository.save(session);
  }

  async extendSession(uuid: string) {
    const session = await this.sessionRepository.findOneBy({ uuid });
    if (!session) {
      throw new Error('Session not found');
    }
    const newExpirationDate = new Date();
    newExpirationDate.setHours(newExpirationDate.getHours() + 4);
    session.expiresAt = newExpirationDate;
    return this.sessionRepository.save(session);
  }

  async findOne(uuid: string) {
    return await this.sessionRepository.findOneBy({ uuid });
  }

  async findAll() {
    const sessions = await this.sessionRepository.find();
    return sessions;
  }

  async findActiveSessionByTableId(id: number) {
    const session = await this.sessionRepository.findOne({
      where: {
        tableId: id,
        expiresAt: Raw((alias) => `${alias} > :date`, { date: new Date() }),
        status: 'running',
      },
    });
    // if (!session) {
    //   throw new SessionNotFoundError('No se encontró una sesión');
    // }
    return session;
  }

  async checkSessionExpiration(uuid: string) {
    const session = await this.sessionRepository.findOneBy({ uuid });
    if (!session) {
      throw new SessionNotFoundError();
    }
    if (session.expiresAt < new Date()) {
      session.status = 'expired';
      return await this.sessionRepository.save(session);
    }
    return session;
    // return await this.sessionRepository
    //   .createQueryBuilder('session')
    //   .where('session.expiresAt < :date', { date: new Date() })
    //   .update({ status: 'expired' })
    //   .execute();
  }
}
