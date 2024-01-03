import { Inject, Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationsRepository } from './reservation.repository';
import { PAYMENT_CLIENT_TOKEN, UserDto } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { map } from 'rxjs';

@Injectable()
export class ReservationService {
    constructor(
        private readonly reservationsRepository: ReservationsRepository,
        @Inject(PAYMENT_CLIENT_TOKEN) private readonly paymentService: ClientProxy,
    ) {}

    async create(createReservationDto: CreateReservationDto, { email, _id: userId }: UserDto) {
        return this.paymentService
            .send('create_charge', {
                ...createReservationDto.charge,
                email,
            })
            .pipe(
                map((res) => {
                    return this.reservationsRepository.create({
                        ...createReservationDto,
                        invoiceId: res.id,
                        createDate: new Date(),
                        userId,
                    });
                }),
            );
    }

    async findAll() {
        return this.reservationsRepository.find({});
    }

    async findOne(_id: string) {
        return this.reservationsRepository.findOne({ _id });
    }

    async update(_id: string, updateReservationDto: UpdateReservationDto) {
        return this.reservationsRepository.findOneAndUpdate({ _id }, { $set: updateReservationDto });
    }

    async remove(_id: string) {
        return this.reservationsRepository.findOneAndDelete({ _id });
    }
}
