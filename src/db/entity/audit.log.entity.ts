import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'audit_log' })
export class AuditLogEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  auditLog: string;
}