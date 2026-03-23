import { IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { IReservation } from '../booking.types';

export class ReservationCreateDto implements Pick<
  IReservation,
  'seat_id' | 'user_id'
> {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'ID места для бронирования (UUID v4)',
  })
  @IsUUID('4')
  seat_id: string;

  @ApiProperty({
    example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    description: 'ID пользователя (UUID v4)',
  })
  @IsUUID('4')
  user_id: string;
}
