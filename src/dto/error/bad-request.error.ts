import { ApiProperty } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';

export class BadRequestError {
  @ApiProperty({ example: HttpStatus.BAD_REQUEST })
  statusCode: number;

  @ApiProperty({ example: 'Invalid ID format' })
  message: string;

  @ApiProperty({ example: 'Bad Request' })
  error: string;
}
