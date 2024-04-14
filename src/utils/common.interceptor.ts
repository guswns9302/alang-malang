import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { instanceToPlain } from 'class-transformer';

export class SuccessResponse<T> {
  readonly result: string;
  readonly code: string;
  readonly data?: T;
  readonly timestamp: string;

  constructor(data: T, code: string) {
    this.result = 'SUCCESS';
    this.code = code;
    this.data = data;
    this.timestamp = new Date().toISOString();
  }
}

// export class CommonInterceptor<T> {
//   readonly result: 'SUCCESS' | 'FAIL';
//   data: T;
// }

@Injectable()
export class Interceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<SuccessResponse<unknown>> {
    const httpContext = context.switchToHttp();
    const response = httpContext.getResponse();
    const statusCode = response.statusCode;
    return next
      .handle()
      .pipe(
        map((data) => new SuccessResponse(instanceToPlain(data), statusCode)),
      );
  }
}
