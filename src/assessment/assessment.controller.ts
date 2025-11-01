import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  // Post,
  // Patch,
  // Delete,
  // Body,
  //Query,
} from '@nestjs/common';
import { AssessmentService } from './assessment.service';
import { AssessmentDto } from './dto/assessment.dto';
import { AuthGuard } from '../guard/auth.guard';

@Controller('assessment')
export class AssessmentController {
  constructor(private readonly assessmentService: AssessmentService) {}

  @Get(':assessmentId')
  @UseGuards(AuthGuard)
  getAssessmentById(@Param('assessmentId') assessmentId: string) {
    return this.assessmentService.getAssessmentById(assessmentId);
  }

  @Post(':assessmentId')
  @UseGuards(AuthGuard)
  createAssessment(
    @Param('assessmentId') assessmentId: string,
    @Body() assessmentDto: AssessmentDto,
  ) {
    return this.assessmentService.createAssessment(assessmentDto);
  }
}
