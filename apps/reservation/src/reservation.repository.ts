import { Injectable, Logger } from '@nestjs/common';
import { ReservationDocument } from './entity/reservation.schema';
import { AbstractRepository } from '@app/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ReservationsRepository extends AbstractRepository<ReservationDocument> {
    protected readonly logger = new Logger(ReservationsRepository.name);

    constructor(
        @InjectModel(ReservationDocument.name)
        reservationModel: Model<ReservationDocument>,
    ) {
        super(reservationModel);
    }
}
