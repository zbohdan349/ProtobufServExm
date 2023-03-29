import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { OrdersService } from './orders.service';

@Controller()
export class OrdersController {
  constructor(private readonly usersService: OrdersService) {}

  @MessagePattern('beginOrder')
  async beginOrder(@Payload() createUserDto: Buffer) {
    return this.usersService.beginOrder(createUserDto);
  }
  @MessagePattern('finshOrder')
  async finshOrder(@Payload() createUserDto: Buffer) {
    return this.usersService.finishOrder(createUserDto);
  }
}
