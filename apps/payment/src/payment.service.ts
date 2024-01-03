import { Inject, Injectable } from '@nestjs/common';
import { NOTIFICATION_CLIENT_TOKEN } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { PaymentCreateChargeDto } from './dto/payment-create-charge.dto';

@Injectable()
export class PaymentService {
    constructor(@Inject(NOTIFICATION_CLIENT_TOKEN) private readonly notificationService: ClientProxy) {}

    async createCharge({ card, amount, email }: PaymentCreateChargeDto) {
        console.log(`card: ${card} amount: ${amount}`);

        this.notificationService.emit('notify_email', {
            email,
            text: `Your payment of $${amount} has completed successfully.`,
        });

        return { id: `${Math.random().toString(36).slice(2, 11)}` };
    }
}
