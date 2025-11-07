import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AssessmentService } from '../service/assessment.service';
import { AssessmentDto } from '../dto/assessment.dto';
import { AuthGuard } from '../guard/auth.guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ApiException } from '../exception/api-exception.decorator';
import { BadRequestError } from '../dto/error/bad-request.error';
import { UnauthorizedError } from '../dto/error/unauthorizedError';
import { NotFoundError } from '../dto/error/not-found.error';
import { InternalServerError } from '../dto/error/internal-server.error';
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
