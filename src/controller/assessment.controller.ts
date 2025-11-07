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
import { ApiTags } from '@nestjs/swagger';
import {
  ApiCreateUserDocs,
  ApiGetUserDocs,
  ApiUpdateAssessmentDocs,
} from '../swagger/assessment.swagger.decorators';

@ApiTags('assessment')
@Controller('assessment')
export class AssessmentController {
  constructor(private readonly assessmentService: AssessmentService) {}

  @ApiGetUserDocs()
  @Get(':assessmentId')
  @UseGuards(AuthGuard)
  getAssessmentById(@Param('assessmentId') assessmentId: string) {
    return this.assessmentService.getAssessmentById(assessmentId);
  }

  @ApiCreateUserDocs()
  @Post(':assessmentId')
  @UseGuards(AuthGuard)
  createAssessment(
    @Param('assessmentId') assessmentId: string,
    @Body() assessmentDto: AssessmentDto,
  ) {
    return this.assessmentService.createAssessment(assessmentDto);
  }

  @ApiUpdateAssessmentDocs()
  @Put(':assessmentId')
  @UseGuards(AuthGuard)
  updateAssessment(
    @Param('assessmentId') assessmentId: string,
    @Body() assessmentDto: AssessmentDto,
  ) {
    return this.assessmentService.updateAssessment(assessmentDto);
  }
}
