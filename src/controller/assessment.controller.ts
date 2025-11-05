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
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiException } from '../exception/api-exception.decorator';
import { BadRequestResponse } from '../dto/error/bad-request.response';
import { UnauthorizedResponse } from '../dto/error/unauthorized.response';
import { NotFoundResponse } from '../dto/error/not-found.response';
import { InternalServerErrorResponse } from '../dto/error/internal-server-error.response';
import { TransformInterceptor } from '../interceptor/transform.interceptor';

@ApiTags('assessment')
@Controller('assessment')
export class AssessmentController {
  constructor(private readonly assessmentService: AssessmentService) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get assessment details.',
    type: AssessmentDto,
  })
  @ApiException(
    { status: 400, description: 'Bad Request', model: BadRequestResponse },
    { status: 401, description: 'Unauthorized', model: UnauthorizedResponse },
    { status: 404, description: 'User not found', model: NotFoundResponse },
    { status: 500, description: 'Internal Server Error', model: InternalServerErrorResponse },
  )
  @ApiBearerAuth()
  @Get(':assessmentId')
  @UseGuards(AuthGuard)
  @UseInterceptors(new TransformInterceptor(AssessmentDto))
  getAssessmentById(@Param('assessmentId') assessmentId: string) {
    return this.assessmentService.getAssessmentById(assessmentId);
  }

  @ApiBody({ type: AssessmentDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Assessment created successfully.',
    type: AssessmentDto,
  })
  @ApiException(
    { status: 400, description: 'Bad Request', model: BadRequestResponse },
    { status: 401, description: 'Unauthorized', model: UnauthorizedResponse },
    { status: 404, description: 'User not found', model: NotFoundResponse },
    { status: 500, description: 'Internal Server Error', model: InternalServerErrorResponse },
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

  @ApiBody({ type: AssessmentDto })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Assessment updated successfully.',
  })
  @ApiException(
    { status: 400, description: 'Bad Request', model: BadRequestResponse },
    { status: 401, description: 'Unauthorized', model: UnauthorizedResponse },
    { status: 404, description: 'User not found', model: NotFoundResponse },
    { status: 500, description: 'Internal Server Error', model: InternalServerErrorResponse },
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
