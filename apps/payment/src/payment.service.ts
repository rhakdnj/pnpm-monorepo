import { Injectable } from '@nestjs/common';
import { CreateChargeDto } from '@app/common/dto/create-charge.dto';

@Injectable()
export class PaymentService {
    async createCharge({ card, amount }: CreateChargeDto) {
        // TODO: Implement
        console.log(card);
        console.log(amount);
        return { id: `${Math.random().toString(36).slice(2, 11)}` };
    }
}
