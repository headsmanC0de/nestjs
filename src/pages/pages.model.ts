import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import type { HydratedDocument } from 'mongoose';

export enum PagesCategory {
    Courses,
    Services,
    Books,
    Products,
}

export class HhData {
    @Prop()
    count: number;

    @Prop()
    juniorSalary: number;

    @Prop()
    middleSalary: number;

    @Prop()
    seniorSalary: number;
}

export class PageAdvantage {
    @Prop()
    title: string;
	
    @Prop()
    description: string;
}

export type PagesModelDocument = HydratedDocument<PagesModel>;

@Schema()
export class PagesModel {
    @Prop()
    _id: string;

    @Prop({ enum: PagesCategory })
    firstCategory: PagesCategory;

    @Prop()
    secondCategory: string;

    @Prop({ unique: true })
    alias: string;

    @Prop()
    title: string;

    @Prop()
    category: string;

    @Prop({ type: () => HhData })
    hh?: HhData;

    @Prop({ type: () => [PageAdvantage] })
    advantages: PageAdvantage[];

    @Prop()
    seoText: string;

    @Prop()
    tagsTitle: string;

    @Prop()
    tags: string[];
}

export const PagesSchema = SchemaFactory.createForClass(PagesModel);
