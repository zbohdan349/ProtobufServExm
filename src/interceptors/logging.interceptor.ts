import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const rpcContext = context.switchToRpc();
    const payload = JSON.stringify(rpcContext.getData());
    const request = rpcContext.getContext().getArgByIndex(0);

    Logger.log(`Incoming request: "${request}", Payload: ${payload}`);

    return next
      .handle()
      .pipe(tap(() => Logger.log(`Request: "${request}" success`)));
  }
}
