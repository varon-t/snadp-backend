import { AssessmentTemplateEntity } from '../dao/entity/assessment.template.entity';
import { AssessmentDto } from '../dto/assessment.dto';

export class AssessmentMapper {
  static toEntity(dto: AssessmentDto): AssessmentTemplateEntity {
    const entity = new AssessmentTemplateEntity();
    if (dto.id !== undefined) entity.id = dto.id;
    entity.template = dto.template;
    entity.description = dto.description;
    entity.status = dto.status;
    return entity;
  }

  static toDto(entity: AssessmentTemplateEntity): AssessmentDto {
    return {
      name: 'John Doe',
      id: entity.id,
      template: entity.template,
      description: entity.description,
      status: entity.status,
    };
  }
}
