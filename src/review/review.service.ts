import type { CreateReviewDto } from './dto/create-review.dto';
import { Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import type { ReviewsDocument } from './review.model';

@Injectable()
export class ReviewService {
    constructor(@InjectModel('review') private readonly reviewsModel: Model<ReviewsDocument>) {}

    async create(dto: CreateReviewDto): Promise<ReviewsDocument> {
        return new this.reviewsModel(dto).save();
    }

    async delete(id: string): Promise<ReviewsDocument | null> {
        return this.reviewsModel.findByIdAndDelete(id).exec();
    }

    async findByProductId(productId: string): Promise<ReviewsDocument[]> {
        return this.reviewsModel
            .find({ productId: new Types.ObjectId(productId).toHexString() })
            .exec();
    }

    async deleteByProductId(productId: string) {
        return this.reviewsModel.deleteMany({ productId: new Types.ObjectId(productId) }).exec();
    }
}
