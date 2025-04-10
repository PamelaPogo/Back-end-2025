import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { Customer } from './interface/customer/customer.interface';
import { CustomersService } from './customers.service'; 

@Controller('customers')
export class CustomersController {
  constructor(private readonly customerService: CustomersService) {}


    //Usar QUERY
@Get('query')
rutaQuery(@Query() query) {
  return `El dato query.x ha recibido el valor ${query.x} y el valor de y es: ${query.y}`;
}

@Get('car')
carQuery(@Query('count') carCount: number) {
  return carCount;
}

@Get('cars')
carsQuery(@Query('count', ParseIntPipe) carCount: number) {
  return `carCount: ${carCount}`;
}

@Get()
  getAllCustomers(): Customer[] {
    return this.customerService.getAll();
  }

  @Get(':id')
  find(@Param('id') id: number) {
    return this.customerService.getId(id);
  }

  @Post()
  @HttpCode(HttpStatus.NO_CONTENT)
  createProduct(
    @Body() body,
  ) {
    this.customerService.insert(body);
  }
}
