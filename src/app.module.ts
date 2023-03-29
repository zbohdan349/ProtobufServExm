import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    PrismaModule.forRoot({
      isGlobal: true,
    }),
    OrdersModule,
  ],
})
export class AppModule {}
