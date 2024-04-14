import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';

export interface ErrorInfo {
  code: string;
  decs?: string;
}

export class FailResponse {
  readonly result: string;
  readonly error: ErrorInfo;

  constructor(error: ErrorInfo) {
    this.result = 'FAIL';
    this.error = error;
  }
}

@Catch()
export class CommonExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost): any {
    const failRes: FailResponse = new FailResponse({
      code: `${exception.code as string}__${exception.type as string}`,
      decs: exception.message,
    });
    host.switchToHttp().getResponse().status(HttpStatus.OK).json(failRes);
  }
}
