import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  HttpCode,
  ParseUUIDPipe,
} from '@nestjs/common';
import { AssessmentService } from '../service/assessment.service';
import { AssessmentDto } from '../dto/assessment.dto';
import { AuthGuard } from '../guard/auth.guard';
import { ApiTags } from '@nestjs/swagger';
import {
  ApiCreateAssessmentDocs,
  ApiGetAssessmentDocs,
  ApiUpdateAssessmentDocs,
} from '../swagger/assessment.swagger.decorators';

@ApiTags('assessment')
@UseGuards(AuthGuard)
@Controller('assessment')
export class AssessmentController {
  constructor(private readonly assessmentService: AssessmentService) {}

  @ApiGetAssessmentDocs()
  @Get(':assessmentId')
  async getAssessmentById(
    @Param('assessmentId', ParseUUIDPipe) assessmentId: string,
  ): Promise<AssessmentDto | null> {
    return this.assessmentService.getAssessmentById(assessmentId);
  }

  @ApiCreateAssessmentDocs()
  @Post()
  @HttpCode(201)
  async createAssessment(
    @Body() assessmentDto: AssessmentDto,
  ): Promise<AssessmentDto> {
    return this.assessmentService.createAssessment(assessmentDto);
  }

  @ApiUpdateAssessmentDocs()
  @Put(':assessmentId')
  async updateAssessment(
    @Param('assessmentId', ParseUUIDPipe) assessmentId: string,
    @Body() assessmentDto: AssessmentDto,
  ): Promise<AssessmentDto> {
    // merge path id into body DTO to ensure the service receives the correct id
    const dtoWithId = { ...assessmentDto, id: assessmentId } as AssessmentDto;
    return this.assessmentService.updateAssessment(dtoWithId);
  }
}
