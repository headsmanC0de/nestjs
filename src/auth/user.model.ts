import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import type { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<UserModel>;

@Schema({ timestamps: true })
export class UserModel {
    @Prop({ unique: true })
    email: string;

    @Prop()
    passwordHash: string;

    // @Prop({ default: new Date() })
    // createdAt: Date;

    // @Prop({ default: new Date() })
    // updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
