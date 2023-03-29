import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { CustomRpcExceptionFilter } from './exeptionsFilters/customRpc.exception.filter';
import { AllExceptionFilter } from './exeptionsFilters/exception.filter';
import { LoggingInterceptor } from './interceptors/logging.interceptor';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.NATS,
      options: {
        servers: [process.env.NATS_HOST],
      },
    },
  );
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalFilters(
    new AllExceptionFilter(),
    new CustomRpcExceptionFilter(),
  );
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
  await app.listen();
}
bootstrap();
