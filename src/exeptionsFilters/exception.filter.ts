import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  Logger,
  RpcExceptionFilter,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { encodeServerError } from 'src/app.proto';
import { ZodError } from 'zod';

@Catch()
export class AllExceptionFilter implements RpcExceptionFilter<any> {
  catch(exception: any, host: ArgumentsHost): Observable<any> {
    console.log(exception?.code);
    const request = host.switchToRpc().getContext().getArgByIndex(0);
    Logger.error(`Incoming request: "${request}" failed \n${exception.stack}`);
    let error;
    if (exception instanceof BadRequestException) {
      error = { message: exception.getResponse() };
    }
    if (exception instanceof ZodError) {
      error = { code: 400, message: exception.format() };
    }

    if (exception?.code && exception?.code.startsWith('P')) {
      error = { message: 'database error' };
    }
    if (!error) {
      error = { message: 'Server error' };
    }

    return throwError(() => {
      return encodeServerError(error);
    });
  }
}
