import { Controller, UsePipes } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { DEFAULT_VALIDATION_PIPE } from '@app/common/constant/validation.pipe';
import { PaymentCreateChargeDto } from './dto/payment-create-charge.dto';

@Controller()
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) {}

    @MessagePattern('create_charge')
    @UsePipes(DEFAULT_VALIDATION_PIPE)
    async createCharge(@Payload() data: PaymentCreateChargeDto) {
        return this.paymentService.createCharge(data);
    }
}
