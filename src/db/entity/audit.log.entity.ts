import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'audit_log' })
export class AuditLogEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  auditLog: string;

  @Column({ nullable: true })
  before: string;

  @Column({ nullable: true })
  after: string;
}