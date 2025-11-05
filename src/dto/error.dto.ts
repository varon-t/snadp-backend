import { ApiProperty } from '@nestjs/swagger';

export class ErrorDto {
  @ApiProperty({ default: 404, example: 404 })
  statusCode: number;
  @ApiProperty({ default: 'Not Found', example: 'Not Found' })
  message: string;
  @ApiProperty({ default: 'Error', example: 'Error' })
  error: string;
}
