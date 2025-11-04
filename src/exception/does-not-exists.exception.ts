import { HttpException, HttpStatus } from '@nestjs/common';

export class UserAlreadyExistsException extends HttpException {
  constructor(assessment: string) {
    super(`Assessment '${assessment}' does not exists`, HttpStatus.CONFLICT);
  }
}