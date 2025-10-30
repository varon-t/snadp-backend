import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AssessmentController } from './assessment/assessment.controller';
import { AssessmentService } from './assessment/assessment.service';

@Module({
  controllers: [AppController, AssessmentController],
  providers: [AppService, AssessmentService],
})
export class AppModule {}
