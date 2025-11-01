import { Injectable } from '@nestjs/common';
import { AssessmentDto } from './dto/assessment.dto';
import { DbService } from '../db/db.service';
import { AssessmentTemplate } from '../db/entity/assessment.template.entity';
import { PaceService } from '../pace/pace.service';

@Injectable()
export class AssessmentService {
  constructor(private readonly dbService: DbService, private readonly paceService: PaceService) {}
  getAssessmentById(assessmentId: string) {
    console.log("Pace Service Invoked ===> " + this.paceService.getData());
    return this.dbService.findOne(+assessmentId);
  }

  createAssessment(assessmentDto: AssessmentDto) {
    const assessmentTemplate = new AssessmentTemplate();
    assessmentTemplate.id = assessmentDto.id;
    assessmentTemplate.template = assessmentDto.template;
    assessmentTemplate.description = assessmentDto.description;
    assessmentTemplate.status = assessmentDto.status;
    return this.dbService.create(assessmentTemplate);
  }
}
