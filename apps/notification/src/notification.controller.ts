import { Controller, UsePipes } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { NotifyEmailDto } from './dto/notify-email.dto';
import { DEFAULT_VALIDATION_PIPE } from '@app/common';

@Controller()
export class NotificationController {
    constructor(private readonly notificationService: NotificationService) {}

    // @UsePipes(DEFAULT_VALIDATION_PIPE)
    @EventPattern('notify_email')
    async notifyEmail(@Payload() data: NotifyEmailDto) {
        return this.notificationService.notifyEmail(data);
    }
}
