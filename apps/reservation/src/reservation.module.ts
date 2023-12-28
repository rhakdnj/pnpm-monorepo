import { Module } from '@nestjs/common';
import { ReservationController } from './reservation.controller';
import { ReservationService } from './reservation.service';
import { DatabaseModule, LoggerModule } from '@app/common';
import { ReservationDocument, ReservationSchema } from './entity/reservation.schema';
import { ReservationsRepository } from './reservation.repository';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            validationSchema: Joi.object({
                MONGODB_URI: Joi.string().required(),
                PORT: Joi.number().required(),
            }),
        }),
        LoggerModule,
        DatabaseModule,
        DatabaseModule.forFeature([{ name: ReservationDocument.name, schema: ReservationSchema }]),
    ],
    controllers: [ReservationController],
    providers: [ReservationService, ReservationsRepository],
})
export class ReservationModule {}
