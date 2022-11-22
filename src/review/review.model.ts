import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ReviewsDocument = HydratedDocument<ReviewsModel>;

// @Schema({ versionKey: false }) - For disable -v (Version doc)
@Schema({ versionKey: false, timestamps: true })
export class ReviewsModel {
    @Prop()
    name: string;

    @Prop()
    title: string;

    @Prop()
    description: string;

    @Prop()
    rating: number;

    @Prop()
    productId: Types.ObjectId;

    // @Prop({ default: new Date() })
    // createdAt: Date;

    // @Prop({ default: new Date() })
    // updateAt: Date;
}

export const ReviewsSchema = SchemaFactory.createForClass(ReviewsModel);
