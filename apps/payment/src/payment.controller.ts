import { Controller, Get, UsePipes, ValidationPipe } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateChargeDto } from '@app/common';

@Controller()
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) {}

    @MessagePattern('create_charge')
    @UsePipes(
        // Must use pipe directly
        new ValidationPipe({
            transform: true,
            whitelist: true,
            transformOptions: { enableImplicitConversion: true },
            disableErrorMessages: true,
        }),
    )
    async createCharge(@Payload() data: CreateChargeDto) {
        return this.paymentService.createCharge(data);
    }
}
