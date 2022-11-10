import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import type { HydratedDocument } from 'mongoose';

export type AuthDocument = HydratedDocument<AuthModel>;

@Schema()
export class AuthModel {
    @Prop()
    email: string;

    @Prop()
    passwordHash: string;

    @Prop({ default: new Date() })
    createdAt: Date;

    @Prop({ default: new Date() })
    updatedAt: Date;
}

export const AuthSchema = SchemaFactory.createForClass(AuthModel);
