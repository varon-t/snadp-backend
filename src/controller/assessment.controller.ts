import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AssessmentService } from '../service/assessment.service';
import { AssessmentDto } from '../dto/assessment.dto';
import { AuthGuard } from '../guard/auth.guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiProperty,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ApiException } from '../exception/api-exception.decorator';
import { BadRequestError } from '../dto/error/bad-request.error';
import { UnauthorizedError } from '../dto/error/unauthorizedError';
import { NotFoundError } from '../dto/error/not-found.error';
import { InternalServerError } from '../dto/error/internal-server.error';
import { TransformInterceptor } from '../interceptor/transform.interceptor';

@ApiTags('assessment')
@Controller('assessment')
export class AssessmentController {
  constructor(private readonly assessmentService: AssessmentService) {}

  @ApiOperation({
    summary: 'Get assessment by id',
    operationId: 'getAssessmentById', // 👈 custom operationId
    description: 'Retrieve an assessment by the given id.',
  })
  @ApiParam({
    name: 'assessmentId',
    description: 'ID of the assessment',
    example: "'8d584cf9-6a6c-4be7-9fc1-158d00279936'",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get assessment details.',
    type: AssessmentDto,
  })
  @ApiException(
    { status: 400, description: 'Bad Request', model: BadRequestError },
    { status: 401, description: 'Unauthorized', model: UnauthorizedError },
    { status: 404, description: 'User not found', model: NotFoundError },
    {
      status: 500,
      description: 'Internal Server Error',
      model: InternalServerError,
    },
  )
  @ApiBearerAuth()
  @Get(':assessmentId')
  @UseGuards(AuthGuard)
  @UseInterceptors(new TransformInterceptor(AssessmentDto))
  getAssessmentById(@Param('assessmentId') assessmentId: string) {
    return this.assessmentService.getAssessmentById(assessmentId);
  }

  @ApiOperation({
    summary: 'Create assessment',
    operationId: 'createAssessment', // 👈 custom operationId
    description: 'Create an assessment.',
  })
  @ApiBody({ type: AssessmentDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Assessment created successfully.',
    type: AssessmentDto,
  })
  @ApiException(
    { status: 400, description: 'Bad Request', model: BadRequestError },
    { status: 401, description: 'Unauthorized', model: UnauthorizedError },
    { status: 404, description: 'User not found', model: NotFoundError },
    { status: 500, description: 'Internal Server Error', model: InternalServerError },
  )
  @ApiBearerAuth()
  @Post(':assessmentId')
  @UseGuards(AuthGuard)
  createAssessment(
    @Param('assessmentId') assessmentId: string,
    @Body() assessmentDto: AssessmentDto,
  ) {
    return this.assessmentService.createAssessment(assessmentDto);
  }

  @ApiOperation({
    summary: 'Update assessment',
    operationId: 'updateAssessment', // 👈 custom operationId
    description: 'Update an assessment for the given id.',
  })
  @ApiParam({
    name: 'assessmentId',
    description: 'ID of the assessment',
    example: "'8d584cf9-6a6c-4be7-9fc1-158d00279936'",
  })
  @ApiBody({ type: AssessmentDto })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Assessment updated successfully.',
  })
  @ApiException(
    { status: 400, description: 'Bad Request', model: BadRequestError },
    { status: 401, description: 'Unauthorized', model: UnauthorizedError },
    { status: 404, description: 'User not found', model: NotFoundError },
    {
      status: 500,
      description: 'Internal Server Error',
      model: InternalServerError,
    },
  )
  @ApiBearerAuth()
  @Put(':assessmentId')
  @UseGuards(AuthGuard)
  updateAssessment(
    @Param('assessmentId') assessmentId: string,
    @Body() assessmentDto: AssessmentDto,
  ) {
    return this.assessmentService.updateAssessment(assessmentDto);
  }
}
