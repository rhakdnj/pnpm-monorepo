import { AbstractDocument } from '@app/common/database/abstract.schema';
import { FilterQuery, Model, Types, UpdateQuery } from 'mongoose';
import { Logger, NotFoundException } from '@nestjs/common';

export abstract class AbstractRepository<TDocument extends AbstractDocument> {
    protected abstract readonly logger: Logger;

    protected constructor(protected readonly model: Model<TDocument>) {}

    async create(document: Omit<TDocument, '_id'>): Promise<TDocument> {
        const result = new this.model({
            ...document,
            _id: new Types.ObjectId(),
        });

        // [TODO]
        // - (원래) return (await createdDocument.save()).toJSON() as unknown as TDocument;
        // - (await createdDocument.save()) as TDocument;
        // - toJSON()은 제거 해도 되지 않을까?
        return (await result.save()).toJSON() as TDocument;
    }

    async findOne(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
        const result = await this.model.findOne(filterQuery).lean<TDocument>(true);

        if (!result) {
            this.logger.warn('Document not found with filterQuery', filterQuery);
            throw new NotFoundException('Document was not found');
        }

        return result;
    }

    async findOneAndUpdate(filterQuery: FilterQuery<TDocument>, update: UpdateQuery<TDocument>): Promise<TDocument> {
        const result = await this.model
            .findOneAndUpdate(filterQuery, update, {
                new: true,
            })
            .lean<TDocument>(true);

        if (!result) {
            this.logger.warn('Document not found with filterQuery', filterQuery);
            throw new NotFoundException('Document was not found');
        }

        return result;
    }

    async find(filterQuery: FilterQuery<TDocument>): Promise<TDocument[]> {
        return this.model.find(filterQuery).lean<TDocument[]>(true);
    }

    async findOneAndDelete(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
        return this.model.findOneAndDelete(filterQuery).lean<TDocument>(true);
    }
}
