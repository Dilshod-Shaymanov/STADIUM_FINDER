import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Cart } from './models/cart.model';

@ApiTags("Cart (Savat)")
@Controller("cart")
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @ApiOperation({ summary: "Yangi Cart qo'shish" })
  @ApiResponse({
    status: 201,
    description: "Cart qoshish",
    type: Cart,
  })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() createCartDto: CreateCartDto): Promise<Cart> {
    return this.cartService.create(createCartDto);
  }

  @ApiOperation({ summary: "Cartlarni chiqarish" })
  @ApiResponse({
    status: 200,
    description: "Cartlar",
    type: [Cart],
  })
  @HttpCode(HttpStatus.OK)
  @Get()
  async findAll(): Promise<Cart[]> {
    return this.cartService.findAll();
  }

  @ApiOperation({ summary: "Cartni id orqali topish" })
  @ApiResponse({
    status: 200,
    description: "Cartni Id orqali topish",
    type: Cart,
  })
  @HttpCode(HttpStatus.OK)
  @Get(":id")
  async findOne(@Param("id") id: number): Promise<Cart> {
    return this.cartService.findOne(id);
  }

  @ApiOperation({ summary: "Cartni id orqali yangilash" })
  @ApiResponse({
    status: 200,
    description: "Cartni Id orqali yangilash",
    type: Cart,
  })
  @HttpCode(HttpStatus.OK)
  @Patch(":id")
  async update(
    @Param("id") id: number,
    @Body() updateCartDto: UpdateCartDto
  ): Promise<Cart> {
    return this.cartService.update(id, updateCartDto);
  }

  @ApiOperation({ summary: "Cartni id orqali o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Cartni Id orqali o'chirish",
    type: Cart,
  })
  @HttpCode(HttpStatus.OK)
  @Delete(":id")
  async remove(@Param("id") id: number): Promise<number> {
    return this.cartService.remove(id);
  }
}
