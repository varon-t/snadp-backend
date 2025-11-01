import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
  RemoveEvent,
  SoftRemoveEvent
} from 'typeorm';
import { AssessmentTemplate } from '../../db/entity/assessment.template.entity';
import { Inject, Injectable } from '@nestjs/common';
import { AuditLogService} from '../../db/auditlog.service';
import { AuditLogEntity} from '../../db/entity/audit.log.entity';
//import { UserEntity } from 'src/entities/user.entity';
import { ClsService } from 'nestjs-cls';

@Injectable()
@EventSubscriber()
export class ChangeAuditSubscriber
  implements EntitySubscriberInterface<AssessmentTemplate>
{
  // Inject some dependencies
  constructor(
    private clsService: ClsService,
    private auditLogService: AuditLogService,
  ) {}


  afterInsert(event: InsertEvent<AssessmentTemplate>) {
    console.log(`AFTER INSERTION, ${JSON.stringify(event.entity)}`);
    const entityBefore = event['databaseEntity']; // This will be null since we are creating a new record
    const entityAfter = event.entity;
    const entityType = event.metadata.targetName;

    try {
      // Avoid to create an audit log for itselft to prevent circular loop
      if (entityType === AuditLogEntity.name) return;

      const entityId = entityAfter.id;
      console.log('clsService', this.clsService);
      const user: string = this.clsService.get('user');
      const auditLog = {
        authorId: user ? user : null, // The change could be made out of a request context
        event: 'insert',
        entityId,
        entityType,
        entityAfter: JSON.stringify(entityAfter),
        entityBefore: JSON.stringify(entityBefore),
      };

      // The auditLogService crate and insert into the audit-log table
      // You can store your audit logs wherever you want
      console.log('Saved audit to audit table');
      const auditLogEntity = new AuditLogEntity();
      //auditLogEntity.id = assessmentDto.id;
      auditLogEntity.auditLog = JSON.stringify(auditLog);

      return this.auditLogService.create(auditLogEntity);
    } catch (error) {
      // Do something with the error
      console.error(error);
    }
  }

  /*
  // You can create a method to generalize the logic from the create afterInsert method
  afterUpdate(event: UpdateEvent<any>) {}
  afterRemove(event: RemoveEvent<any>) {}
  afterUpdate(event: SoftRemoveEvent<any>) {}

   */
}