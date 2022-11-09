import { ReviewsSchema } from './review.model';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';

@Module({
    controllers: [ReviewController],
    imports: [
        MongooseModule.forFeature([
            {
                name: 'review',
                schema: ReviewsSchema,
                collection: 'review',
            },
        ]),
    ],
    providers: [ReviewService],
})
export class ReviewModule {}
