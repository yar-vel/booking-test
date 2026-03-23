import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { BookingService } from './booking.service';
import { ReservationCreateDto } from './dto/reservation-create.dto';

@ApiTags('booking')
@Controller('')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post('reserve')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Забронировать место' })
  @ApiResponse({ status: 201, description: 'Успешное бронирование' })
  @ApiResponse({ status: 409, description: 'Место уже забронировано' })
  @ApiResponse({ status: 400, description: 'Ошибка валидации данных' })
  async reserve(@Body() dto: ReservationCreateDto): Promise<void> {
    return this.bookingService.reserve(dto);
  }
}
