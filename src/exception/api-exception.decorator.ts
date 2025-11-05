// api-exception.decorator.ts
import { applyDecorators, Type } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

interface ApiExceptionOptions {
  status: number;
  description: string;
  model?: Type<any>;
}

export function ApiException(...exceptions: ApiExceptionOptions[]) {
  const decorators = exceptions.map((e) =>
    ApiResponse({
      status: e.status,
      description: e.description,
      type: e.model,
    }),
  );
  return applyDecorators(...decorators);
}
