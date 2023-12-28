import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { UserService } from '../user/user.service';
import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { TokenPayload } from '../interface/token-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly configService: ConfigService, private readonly userService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => request?.cookies?.Authentication]),
            secretOrKey: configService.get('JWT_SECRET'),
        });
    }

    async validate({ userId }: TokenPayload) {
        return this.userService.getUser({ _id: userId });
    }
}
