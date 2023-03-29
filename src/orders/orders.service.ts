import { Injectable } from '@nestjs/common';
import { Status } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { decodeOrder, encodeOrder } from 'src/app.proto';
import { CustomRpcException } from 'src/exeptionsFilters/customRpc.exception';

import { OrderMessageSchema } from './entities/order.shema';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async beginOrder(orderData: Buffer) {
    const order = OrderMessageSchema.parse(decodeOrder(orderData));

    return this.prisma
      .$transaction([
        this.prisma.order.create({
          data: {
            id: order.id,
            subjectId: order.subjectId,
            userId: order.userId,
          },
        }),
        this.prisma.logs.create({
          data: {
            orderId: order.id,
            subjectId: order.subjectId,
            userId: order.userId,
          },
        }),
      ])
      .then(([order]) => {
        return encodeOrder(order);
      })
      .catch((error) => {
        if (error.code !== 'P2002') {
          throw error;
        }
        throw new CustomRpcException({
          code: 404,
          message: `Error creating Order #${order.id}`,
        });
      });
  }
  async finishOrder(orderData: Buffer) {
    const order = OrderMessageSchema.parse(decodeOrder(orderData));

    return this.prisma
      .$transaction([
        this.prisma.order.update({
          where: {
            id: order.id,
          },
          data: {
            status: Status.DONE,
          },
        }),
        this.prisma.logs.create({
          data: {
            orderId: order.id,
            subjectId: order.subjectId,
            userId: order.userId,
            status: Status.DONE,
          },
        }),
      ])
      .then(([order]) => {
        return encodeOrder(order);
      })
      .catch((error) => {
        if (error.code !== 'P2025') {
          throw error;
        }
        throw new CustomRpcException({
          code: 404,
          message: `Order #${order.id} not found`,
        });
      });
  }
}
