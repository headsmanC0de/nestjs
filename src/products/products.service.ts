import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ProductsModel } from './products.model';
import type { Model } from 'mongoose';
import type { ReviewsModel } from 'src/review/review.model';
import type { CreateProductDto } from './dto/create-product.dto';
import type { FindProductDto } from './dto/find-product.dto';

@Injectable()
export class ProductsService {
    constructor(
        @InjectModel(ProductsModel.name) private readonly productsModel: Model<ProductsModel>
    ) {}

    async create(dto: CreateProductDto) {
        return new this.productsModel(dto).save();
    }

    async findById(id: string) {
        return this.productsModel.findById(id).exec();
    }

    async deleteById(id: string) {
        return this.productsModel.findByIdAndDelete(id).exec();
    }

    async updateById(id: string, dto: CreateProductDto) {
        return this.productsModel.findByIdAndUpdate(id, dto, { new: true }).exec();
    }

    async findWithReviews(dto: FindProductDto) {
        return this.productsModel
            .aggregate([
                {
                    $match: {
                        categories: dto.category,
                    },
                },
                {
                    $sort: {
                        _id: 1,
                    },
                },
                {
                    $limit: dto.limit,
                },
                {
                    $lookup: {
                        from: 'review',
                        localField: '_id',
                        foreignField: 'productId',
                        as: 'reviews',
                    },
                },
                {
                    $addFields: {
                        reviewCount: { $size: '$reviews' },
                        reviewAvg: { $avg: '$reviews.rating' },
                        reviews: {
                            $function: {
                                body: `function (reviews) {
								reviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
								return reviews;
							}`,
                                args: ['$reviews'],
                                lang: 'js',
                            },
                        },
                    },
                },
            ])
            .exec() as Promise<
            (ProductsModel & { review: ReviewsModel[]; reviewCount: number; reviewAvg: number })[]
        >;
    }
}
