import * as common from '@nestjs/common';
import { instanceToInstance, instanceToPlain, plainToInstance } from 'class-transformer';
import { map, Observable } from 'rxjs';

@common.Injectable()
export class TransformInterceptor<T> implements common.NestInterceptor {
  constructor(private readonly dto: common.Type<T>) {}

  intercept(
    context: common.ExecutionContext,
    next: common.CallHandler,
  ): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        // Convert response data to the provided DTO

        return instanceToInstance(this.dto, data);
        /*
        return plainToInstance(this.dto, data, {
          excludeExtraneousValues: true, // only include @Expose() fields
        });

         */
      }),
    );
  }
}
