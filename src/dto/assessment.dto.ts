import { IsString, IsNotEmpty } from 'class-validator';
import { IsValid } from '../validator/assessment.validator';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class AssessmentDto {
  @IsNotEmpty()
  @IsString()
  @IsValid({
    message: 'The name is not valid.',
  })
  @Expose()
  readonly name: string;

  @ApiProperty({
    example: '8d584cf9-6a6c-4be7-9fc1-158d00279936',
    description: 'assessment id',
  })
  @Expose({ name: 'id' })
  readonly id: string;

  @ApiProperty({
    example: 'this is the assessment template',
    description: 'assessment template',
  })
  @Expose({ name: 'template' })
  readonly template: string;

  @ApiProperty({
    example: 'this is the assessment description',
    description: 'assessment description',
  })
  @Expose({ name: 'description' })
  readonly description: string;

  @ApiProperty({
    example: 'CREATED',
    description: 'status',
  })
  @Expose({ name: 'status' })
  readonly status?: string;
}
