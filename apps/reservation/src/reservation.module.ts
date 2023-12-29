import { Module } from '@nestjs/common';
import { ReservationController } from './reservation.controller';
import { ReservationService } from './reservation.service';
import { AUTH_CLIENT_TOKEN, DatabaseModule, LoggerModule } from '@app/common';
import {
    ReservationDocument,
    ReservationSchema,
} from './entity/reservation.schema';
import { ReservationsRepository } from './reservation.repository';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            validationSchema: Joi.object({
                MONGODB_URI: Joi.string().required(),
                HTTP_PORT: Joi.number().required(),
                AUTH_HOST: Joi.string().required(),
                AUTH_PORT: Joi.number().required(),
            }),
        }),
        LoggerModule,
        DatabaseModule,
        DatabaseModule.forFeature([
            { name: ReservationDocument.name, schema: ReservationSchema },
        ]),
        ClientsModule.registerAsync([
            {
                name: AUTH_CLIENT_TOKEN,
                useFactory: (configService: ConfigService) => ({
                    transport: Transport.TCP,
                    options: {
                        host: configService.get('AUTH_HOST'),
                        port: configService.get('AUTH_PORT'),
                    },
                }),
                inject: [ConfigService],
            },
        ]),
    ],
    controllers: [ReservationController],
    providers: [ReservationService, ReservationsRepository],
})
export class ReservationModule {}
