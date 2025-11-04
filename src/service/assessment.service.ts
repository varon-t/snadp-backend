import { Injectable } from '@nestjs/common';
import { AssessmentDto } from '../dto/assessment.dto';
import { DbService } from '../dao/db.service';
import { AssessmentTemplate } from '../dao/entity/assessment.template.entity';
import { PaceService } from '../pace/pace.service';

@Injectable()
export class AssessmentService {
  constructor(
    private readonly dbService: DbService,
    private readonly paceService: PaceService,
  ) {}
  getAssessmentById(assessmentId: string) {
    return this.dbService.findOne(assessmentId);
  }

  createAssessment(assessmentDto: AssessmentDto) {
    const assessmentTemplate = new AssessmentTemplate();
    assessmentTemplate.id = assessmentDto.id;
    assessmentTemplate.template = assessmentDto.template;
    assessmentTemplate.description = assessmentDto.description;
    assessmentTemplate.status = assessmentDto.status;
    return this.dbService.create(assessmentTemplate);
  }

  updateAssessment(assessmentDto: AssessmentDto) {
    const assessmentTemplate = new AssessmentTemplate();
    assessmentTemplate.id = assessmentDto.id;
    assessmentTemplate.template = assessmentDto.template;
    assessmentTemplate.description = assessmentDto.description;
    assessmentTemplate.status = assessmentDto.status;
    return this.dbService.update(assessmentTemplate);
  }
}
