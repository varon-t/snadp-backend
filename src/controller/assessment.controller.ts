import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AssessmentService } from '../service/assessment.service';
import { AssessmentDto } from '../dto/assessment.dto';
import { AuthGuard } from '../guard/auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { TransformInterceptor } from '../interceptor/transform.interceptor';
import {
  OpenApiCreateAssessment,
  OpenApiGetAssessmentById,
  OpenApiUpdateAssessment,
} from '../swagger/assessment.swagger.decorators';

@ApiTags('assessment')
@Controller('assessment')
export class AssessmentController {
  constructor(private readonly assessmentService: AssessmentService) {}

  @OpenApiGetAssessmentById()
  @Get(':assessmentId')
  @UseGuards(AuthGuard)
  @UseInterceptors(new TransformInterceptor(AssessmentDto))
  getAssessmentById(@Param('assessmentId') assessmentId: string) {
    return this.assessmentService.getAssessmentById(assessmentId);
  }

  @OpenApiCreateAssessment()
  @Post(':assessmentId')
  @UseGuards(AuthGuard)
  createAssessment(
    @Param('assessmentId') assessmentId: string,
    @Body() assessmentDto: AssessmentDto,
  ) {
    return this.assessmentService.createAssessment(assessmentDto);
  }

  @OpenApiUpdateAssessment()
  @Put(':assessmentId')
  @UseGuards(AuthGuard)
  updateAssessment(
    @Param('assessmentId') assessmentId: string,
    @Body() assessmentDto: AssessmentDto,
  ) {
    return this.assessmentService.updateAssessment(assessmentDto);
  }
}
