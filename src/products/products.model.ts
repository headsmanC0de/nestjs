import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import type { HydratedDocument } from 'mongoose';

export class ProductCharacteristic {
    @Prop()
    name: string;

    @Prop()
    value: string;
}

export type ProductsModelDocument = HydratedDocument<ProductsModel>;

// @Schema()
@Schema({ timestamps: true })
export class ProductsModel {
    @Prop()
    image: string;

    @Prop()
    title: string;

    @Prop()
    price: number;

    @Prop()
    oldPrice?: number;

    @Prop()
    credit: number;

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

    // @Prop({ default: new Date() })
    // createdAt: Date;

    // @Prop({ default: new Date() })
    // updatedAt: Date;
}

export const ProductsSchema = SchemaFactory.createForClass(ProductsModel);
