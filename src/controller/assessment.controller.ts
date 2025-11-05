import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AssessmentService } from '../service/assessment.service';
import { AssessmentDto } from '../dto/assessment.dto';
import { AuthGuard } from '../guard/auth.guard';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('assessment') // groups endpoints in Swagger UI
@Controller('assessment')
export class AssessmentController {
  constructor(private readonly assessmentService: AssessmentService) {}

  @ApiResponse({ status: 200, description: 'Get assessment details.' })
  @Get(':assessmentId')
  @UseGuards(AuthGuard)
  getAssessmentById(@Param('assessmentId') assessmentId: string) {
    return this.assessmentService.getAssessmentById(assessmentId);
  }

  @ApiBody({ type: AssessmentDto })
  @ApiResponse({ status: 201, description: 'Assessment created successfully.' })
  @Post(':assessmentId')
  @UseGuards(AuthGuard)
  createAssessment(
    @Param('assessmentId') assessmentId: string,
    @Body() assessmentDto: AssessmentDto,
  ) {
    return this.assessmentService.createAssessment(assessmentDto);
  }

  @ApiBody({ type: AssessmentDto })
  @ApiResponse({ status: 201, description: 'Assessment updated successfully.' })
  @Put(':assessmentId')
  @UseGuards(AuthGuard)
  updateAssessment(
    @Param('assessmentId') assessmentId: string,
    @Body() assessmentDto: AssessmentDto,
  ) {
    return this.assessmentService.updateAssessment(assessmentDto);
  }
}
