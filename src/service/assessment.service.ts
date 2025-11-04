import { Injectable } from '@nestjs/common';

@Injectable()
export class AssessmentService {
  getAssessment(): string {
    return 'Hello World!';
  }
}
