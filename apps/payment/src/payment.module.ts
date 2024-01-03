import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { LoggerModule, NOTIFICATION_CLIENT_TOKEN } from '@app/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            validationSchema: Joi.object({
                TCP_PORT: Joi.number().required(),
                NOTIFICATION_HOST: Joi.string().required(),
                NOTIFICATION_PORT: Joi.number().required(),
            }),
        }),
        LoggerModule,
        ClientsModule.registerAsync([
            {
                name: NOTIFICATION_CLIENT_TOKEN,
                useFactory: (configService: ConfigService) => ({
                    transport: Transport.TCP,
                    options: {
                        host: configService.get('NOTIFICATION_HOST'),
                        port: configService.get('NOTIFICATION_PORT'),
                    },
                }),
                inject: [ConfigService],
            },
        ]),
    ],
    controllers: [PaymentController],
    providers: [PaymentService],
})
export class PaymentModule {}
