import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { UserService } from '../user/user.service';
import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { TokenPayload } from '../interface/token-payload.interface';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly configService: ConfigService,
        private readonly userService: UserService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (request: Request & { Authentication?: string }) =>
                    request?.cookies?.Authentication ?? request?.Authentication,
            ]), // HTTP or RPC Request
            secretOrKey: configService.get('JWT_SECRET'),
        });
    }

    async validate({ userId }: TokenPayload) {
        return this.userService.getUser({ _id: userId });
    }
}
