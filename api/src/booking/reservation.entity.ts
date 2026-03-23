import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  Index,
} from 'typeorm';

import { IReservation } from './booking.types';

@Entity('reservations')
export class ReservationEntity implements IReservation {
  @PrimaryColumn('uuid')
  seat_id: string;

  @Column('uuid')
  @Index()
  user_id: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
}
