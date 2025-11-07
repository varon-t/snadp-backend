import { ApiProperty } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';

export class NotFoundError {
  @ApiProperty({ example: HttpStatus.NOT_FOUND })
  statusCode: number;

  @ApiProperty({ example: 'User not found' })
  message: string;

  @ApiProperty({ example: 'Not Found' })
  error: string;
}
