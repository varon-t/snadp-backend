import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AssessmentTemplate } from './entity/assessment.template.entity';
import { AuditLogEntity } from './entity/audit.log.entity';

@Injectable()
export class AuditLogService {
  constructor(@InjectRepository(AuditLogEntity)
    private readonly repo: Repository<AuditLogEntity>,
  ) {}

  async create(auditLog: AuditLogEntity): Promise<AuditLogEntity> {
    console.log(`Creating auditLog ${auditLog.auditLog}`);
    return this.repo.save(auditLog);
  }
}
