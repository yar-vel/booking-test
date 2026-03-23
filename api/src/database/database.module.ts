import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { cfg } from 'config/configuration';
import { ReservationEntity } from 'src/booking/reservation.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: cfg.postgres.host,
        port: cfg.postgres.port,
        username: cfg.postgres.user,
        password: cfg.postgres.password,
        database: cfg.postgres.db,
        synchronize: cfg.postgres.synchronize,
        logging: cfg.postgres.logging || ['error'],
        entities: [ReservationEntity],
      }),
    }),
  ],
})
export class DatabaseModule {}
