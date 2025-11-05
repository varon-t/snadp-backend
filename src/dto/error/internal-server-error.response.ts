import { ApiProperty } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';

export class InternalServerErrorResponse {
  @ApiProperty({ example: HttpStatus.INTERNAL_SERVER_ERROR })
  statusCode: number;

  @ApiProperty({ example: 'Internal Server Error' })
  message: string;

  @ApiProperty({ example: 'Internal Error' })
  error: string;
}
