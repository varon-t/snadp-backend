import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity({ name: 'audit_log' })
export class AuditLogEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'author_id', nullable: true })
  authorId: string;

  @Column({ name: 'log', nullable: true })
  auditLog: string;

  @Column({ nullable: true })
  before: string;

  @Column({ nullable: true })
  after: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;
}
