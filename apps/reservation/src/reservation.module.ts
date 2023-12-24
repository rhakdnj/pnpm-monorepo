import { Module } from '@nestjs/common';
import { ReservationController } from './reservation.controller';
import { ReservationService } from './reservation.service';
import { DatabaseModule, LoggerModule } from '@app/common';
import {
  ReservationDocument,
  ReservationSchema,
} from './entity/reservation.schema';
import { ReservationsRepository } from './reservation.repository';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([
      { name: ReservationDocument.name, schema: ReservationSchema },
    ]),
    LoggerModule,
  ],
  controllers: [ReservationController],
  providers: [ReservationService, ReservationsRepository],
})
export class ReservationModule {}
