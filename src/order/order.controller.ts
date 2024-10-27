import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Order } from './models/order.model';

@ApiTags("Order (Buyurtma)")
@Controller("order")
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiOperation({ summary: "Yangi Region nomini qo'shish" })
  @ApiResponse({
    status: 201,
    description: "Order qoshish",
    type: Order,
  })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return this.orderService.createOrder(createOrderDto);
  }

  @ApiOperation({ summary: "Orderlarini chiqarish" })
  @ApiResponse({
    status: 200,
    description: "Orderlarni chiqarish",
    type: [Order],
  })
  @HttpCode(HttpStatus.OK)
  @Get()
  async findAll(): Promise<Order[]> {
    return this.orderService.findAll();
  }

  @ApiOperation({ summary: "Orderni id orqli topish" })
  @ApiResponse({
    status: 200,
    description: "Orderni Id orqali topish",
    type: Order,
  })
  @HttpCode(HttpStatus.OK)
  @Get(":id")
  async findOne(@Param("id", ParseIntPipe) id: number): Promise<Order> {
    return this.orderService.findOne(id);
  }

  @ApiOperation({ summary: "Orderni id orqli yangilash" })
  @ApiResponse({
    status: 200,
    description: "Orderni Id orqali yangilash",
    type: Order,
  })
  @HttpCode(HttpStatus.OK)
  @Patch(":id")
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateOrderDto: UpdateOrderDto
  ): Promise<Order> {
    return this.orderService.update(id, updateOrderDto);
  }

  @ApiOperation({ summary: "Orderni id orqli o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Orderni Id orqali o'chirish",
    type: Order,
  })
  @HttpCode(HttpStatus.OK)
  @Delete(":id")
  async remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    await this.orderService.remove(id);
  }
}
