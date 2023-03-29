import {
  ArgumentsHost,
  Catch,
  Logger,
  RpcExceptionFilter,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { encodeServerError } from 'src/app.proto';
import { CustomRpcException } from './customRpc.exception';

@Catch(CustomRpcException)
export class CustomRpcExceptionFilter
  implements RpcExceptionFilter<CustomRpcException>
{
  catch(
    exception: CustomRpcException,
    host: ArgumentsHost,
  ): Observable<CustomRpcException> {
    const request = host.switchToRpc().getContext().getArgByIndex(0);
    Logger.warn(`Incoming request: "${request}" failed \n${exception.stack}`);

    return throwError(() => {
      return encodeServerError(exception.getCustomError());
    });
  }
}
