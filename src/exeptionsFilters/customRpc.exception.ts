import { RpcException } from '@nestjs/microservices';
interface Err {
  code?: number;
  message: string;
}
export class CustomRpcException extends RpcException {
  private customError;
  constructor(error: Err) {
    super(error);
    this.customError = error;
  }
  getCustomError(): Err {
    return this.customError;
  }
}
