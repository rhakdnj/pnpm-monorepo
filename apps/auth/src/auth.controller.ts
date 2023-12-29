import { Controller, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { CurrentUser } from '@app/common/decorator/current-user.decorator';
import { UserDocument } from './user/entity/user.schema';
import { Response } from 'express';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { JwtAuthGuard } from './guard/jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(
        @CurrentUser() user: UserDocument,
        @Res({ passthrough: true }) response: Response,
    ) {
        await this.authService.login(user, response);
        response.send(user);
    }

    @UseGuards(JwtAuthGuard)
    @MessagePattern('authenticate')
    async authenticate(@Payload() data: { user: UserDocument }) {
        return data.user;
    }
}
