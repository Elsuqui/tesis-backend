import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

export class Audit {
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @DeleteDateColumn()
  deletedAt: Date;
}
