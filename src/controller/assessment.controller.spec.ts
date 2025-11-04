import { Test, TestingModule } from '@nestjs/testing';
import { AssessmentController } from './assessment.controller';
import { AssessmentService } from '../service/assessment.service';

describe('AssessmentController', () => {
  let appController: AssessmentController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AssessmentController],
      providers: [AssessmentService],
    }).compile();

    appController = app.get<AssessmentController>(AssessmentController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getAssessment()).toBe('Hello World!');
    });
  });
});
