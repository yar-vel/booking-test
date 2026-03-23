import { Module } from '@nestjs/common';

import { BookingModule } from './booking/booking.module';
import { DatabaseModule } from './database/database.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [HealthModule, DatabaseModule, BookingModule],
})
export class AppModule {}
