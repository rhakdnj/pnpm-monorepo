import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { CurrentUser, JwtAuthGuard, UserDto } from '@app/common';

@UseGuards(JwtAuthGuard)
@Controller('reservations')
export class ReservationController {
    constructor(private readonly reservationsService: ReservationService) {}

    @Post()
    async create(@Body() createReservationDto: CreateReservationDto, @CurrentUser() userDto: UserDto) {
        return this.reservationsService.create(createReservationDto, userDto);
    }

    @Get()
    async findAll() {
        return this.reservationsService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.reservationsService.findOne(id);
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateReservationDto: UpdateReservationDto) {
        return this.reservationsService.update(id, updateReservationDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.reservationsService.remove(id);
    }
}
