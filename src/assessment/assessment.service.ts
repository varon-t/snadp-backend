import { Injectable } from '@nestjs/common';
import { AssessmentDto } from './dto/assessment.dto';

@Injectable()
export class AssessmentService {
  getAssessmentById(assessmentId?: string) {
    return 'Assessment Details ' + assessmentId;
  }

  createAssessment(assessmentDto: AssessmentDto) {
    return 'Assessment Created ' + assessmentDto.name;
  }
}
