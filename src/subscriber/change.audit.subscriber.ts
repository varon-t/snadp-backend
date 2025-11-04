import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
  Connection,
} from 'typeorm';
import { AssessmentTemplate } from '../dao/entity/assessment.template.entity';
import { Injectable } from '@nestjs/common';
import { AuditLogService } from '../dao/auditlog.service';
import { AuditLogEntity } from '../dao/entity/audit.log.entity';
import { ClsService } from 'nestjs-cls';
import { DbService } from '../dao/db.service';

@Injectable()
@EventSubscriber()
export class ChangeAuditSubscriber
  implements EntitySubscriberInterface<AssessmentTemplate>
{
  constructor(
    private readonly connection: Connection,
    private clsService: ClsService,
    private auditLogService: AuditLogService,
    private dbService: DbService,
  ) {
    connection.subscribers.push(this); // <---- THIS
  }

  afterInsert(event: InsertEvent<AssessmentTemplate>) {
    const entityBefore = event['databaseEntity']; // This will be null since we are creating a new record
    const entityAfter = event.entity;
    const entityType = event.metadata.targetName;
    try {
      if (entityType === AuditLogEntity.name) return;

      const entityId = entityAfter.id;
      const user: string = this.clsService.get('user');
      const auditLog = {
        authorId: user ? user : null,
        event: 'insert',
        entityId,
        entityType,
        entityAfter: JSON.stringify(entityAfter),
        entityBefore: JSON.stringify(entityBefore),
      };
      const auditLogEntity = new AuditLogEntity();
      auditLogEntity.auditLog = JSON.stringify(auditLog);
      auditLogEntity.before = JSON.stringify(entityBefore);
      auditLogEntity.after = JSON.stringify(entityAfter);
      return this.auditLogService.create(auditLogEntity);
    } catch (error) {
      console.error(error);
    }
  }

  async beforeUpdate(event: UpdateEvent<AssessmentTemplate>) {
    const entityBefore = event.databaseEntity; // The entity with the old values
    const entityAfter = event.entity; // The entity with the new values
    const entityType = event.metadata.targetName;
    const entityBefore1 = await this.dbService.findOne(
      (entityAfter as AssessmentTemplate).id,
    );

    try {
      if (entityType === AuditLogEntity.name) return;

      const entityId = entityBefore1.id;
      const user: string = this.clsService.get('user');
      const auditLog = {
        authorId: user ? user : null,
        event: 'update',
        entityId,
        entityType,
        entityBefore: JSON.stringify(entityBefore),
        entityAfter: JSON.stringify(entityAfter),
      };
      const auditLogEntity = new AuditLogEntity();
      auditLogEntity.authorId = user ? user : '';
      auditLogEntity.auditLog = JSON.stringify(auditLog);
      auditLogEntity.before = JSON.stringify(entityBefore1);
      auditLogEntity.after = JSON.stringify(entityAfter);
      return this.auditLogService.create(auditLogEntity);
    } catch (error) {
      console.error(error);
    }
  }
}
