import { IsString, IsNotEmpty } from 'class-validator';
import { IsValid } from '../validator/assessment.validator';

export class AssessmentDto {
  @IsNotEmpty()
  @IsString()
  @IsValid({
    message: 'The name is not valid.',
  })
  readonly name: string;
  readonly id: number;

  readonly template: string;
  readonly description: string;
  readonly status?: string;
}
