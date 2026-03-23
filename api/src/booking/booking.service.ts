import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ReservationEntity } from './reservation.entity';
import { ReservationCreateDto } from './dto/reservation-create.dto';

@Injectable()
export class BookingService {
  private readonly logger = new Logger(BookingService.name);

  constructor(
    @InjectRepository(ReservationEntity)
    private readonly reservationRepository: Repository<ReservationEntity>,
  ) {}

  async reserve(dto: ReservationCreateDto): Promise<void> {
    try {
      await this.reservationRepository.insert({
        seat_id: dto.seat_id,
        user_id: dto.user_id,
      });
    } catch (error) {
      if ((error as Record<string, string>).code === '23505') {
        throw new ConflictException('Seat is already reserved');
      }

      this.logger.error(
        `Failed to reserve seat ${dto.seat_id}: ${(error as Record<string, string>).message}`,
      );
      throw new InternalServerErrorException('Reservation failed');
    }
  }
}
