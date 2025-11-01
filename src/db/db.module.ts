import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbService } from './db.service';
import { AssessmentTemplate } from './entity/assessment.template.entity';
import { AuditLogService } from './auditlog.service';
import { AuditLogEntity } from './entity/audit.log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AssessmentTemplate, AuditLogEntity])],
  providers: [DbService, AuditLogService],
  exports: [DbService, AuditLogService], // if other modules need DbService
})
export class DbModule {}
