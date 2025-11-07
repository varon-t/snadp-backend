import { applyDecorators, HttpStatus } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { AssessmentDto } from '../dto/assessment.dto';
import { ApiException } from '../exception/api-exception.decorator';
import { BadRequestError } from '../dto/error/bad-request.error';
import { UnauthorizedError } from '../dto/error/unauthorized.error';
import { NotFoundError } from '../dto/error/not-found.error';
import { InternalServerError } from '../dto/error/internal-server.error';

export function ApiGetUserDocs() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get assessment by id',
      operationId: 'getAssessmentById', // 👈 custom operationId
      description: 'Retrieve an assessment by the given id.',
    }),
    ApiParam({
      name: 'assessmentId',
      description: 'ID of the assessment',
      example: "'8d584cf9-6a6c-4be7-9fc1-158d00279936'",
    }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Get assessment details.',
      type: AssessmentDto,
    }),
    ApiException(
      { status: 400, description: 'Bad Request', model: BadRequestError },
      { status: 401, description: 'Unauthorized', model: UnauthorizedError },
      { status: 404, description: 'User not found', model: NotFoundError },
      {
        status: 500,
        description: 'Internal Server Error',
        model: InternalServerError,
      },
    ),
    ApiBearerAuth(),
  );
}

export function ApiCreateUserDocs() {
  return applyDecorators(
    ApiOperation({
      summary: 'Create assessment',
      operationId: 'createAssessment', // 👈 custom operationId
      description: 'Create an assessment.',
    }),
    ApiBody({ type: AssessmentDto }),
    ApiResponse({
      status: HttpStatus.CREATED,
      description: 'Assessment created successfully.',
      type: AssessmentDto,
    }),
    ApiException(
      { status: 400, description: 'Bad Request', model: BadRequestError },
      { status: 401, description: 'Unauthorized', model: UnauthorizedError },
      { status: 404, description: 'User not found', model: NotFoundError },
      {
        status: 500,
        description: 'Internal Server Error',
        model: InternalServerError,
      },
    ),
    ApiBearerAuth(),
  );
}

export function ApiUpdateAssessmentDocs() {
  return applyDecorators(
    ApiOperation({
      summary: 'Update assessment',
      operationId: 'updateAssessment', // 👈 custom operationId
      description: 'Update an assessment for the given id.',
    }),
    ApiParam({
      name: 'assessmentId',
      description: 'ID of the assessment',
      example: "'8d584cf9-6a6c-4be7-9fc1-158d00279936'",
    }),
    ApiBody({ type: AssessmentDto }),
    ApiResponse({
      status: HttpStatus.NO_CONTENT,
      description: 'Assessment updated successfully.',
    }),
    ApiException(
      { status: 400, description: 'Bad Request', model: BadRequestError },
      { status: 401, description: 'Unauthorized', model: UnauthorizedError },
      { status: 404, description: 'User not found', model: NotFoundError },
      {
        status: 500,
        description: 'Internal Server Error',
        model: InternalServerError,
      },
    ),
    ApiBearerAuth(),
  );
}
