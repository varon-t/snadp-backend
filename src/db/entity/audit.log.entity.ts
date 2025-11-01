import {
  Entity,
  PrimaryGeneratedColumn,
  Column
} from 'typeorm';

@Entity({ name: 'audit_log' }) //, schema: 'snadp_assessment_db' })
export class AuditLogEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  auditLog: string;
}