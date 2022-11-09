import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import type { HydratedDocument } from 'mongoose';

export class ProductCharacteristic {
    @Prop()
    name: string;
    @Prop()
    value: string;
}
export type ProductsModelDocument = HydratedDocument<ProductsModel>;

@Schema()
export class ProductsModel {
    @Prop()
    _id: string;

    @Prop()
    image: string;

    @Prop()
    title: string;

    @Prop()
    price: number;

    @Prop()
    oldPrice: number;

    @Prop()
    credit: number;

    @Prop()
    calculatedRating: number;

    @Prop()
    description: string;

    @Prop()
    advantages: string;

    @Prop()
    disAdvantages: string;

    @Prop({ type: () => [String] })
    categories: string[];

    @Prop({ type: () => [String] })
    tags: string[];

    @Prop({ type: () => [ProductCharacteristic] })
    characteristics: ProductCharacteristic[];

    @Prop()
    createdAt: Date;
    @Prop()
    updatedAt: Date;
}

export const ProductsSchema = SchemaFactory.createForClass(ProductsModel);
