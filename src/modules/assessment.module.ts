import { Module } from '@nestjs/common';
import { AssessmentController } from '../controller/assessment.controller';
import { AssessmentService } from '../service/assessment.service';

@Module({
  imports: [],
  controllers: [AssessmentController],
  providers: [AssessmentService],
})
export class AssessmentModule {}
