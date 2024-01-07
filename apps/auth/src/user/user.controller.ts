import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { CurrentUser } from '@app/common/decorator/current-user.decorator';
import { UserDocument } from '@app/common';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getUser(@CurrentUser() user: UserDocument) {
        return user;
    }
}
