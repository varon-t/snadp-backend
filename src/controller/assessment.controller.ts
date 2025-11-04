import { Controller, Get } from '@nestjs/common';
import { AssessmentService } from '../service/assessment.service';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";

@Controller()
@ApiTags('Assessment')
export class AssessmentController {
  constructor(private readonly assessmentService: AssessmentService) {}

  @Get()
  @ApiOperation({ summary: 'Get Assessment' })
  @ApiResponse({ status: 200, description: 'Success' })
  getAssessment(): string {
    return this.assessmentService.getAssessment();
  }
}
