import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop({ required: true })
    userId: number;

    @Prop({ required: true })
    username: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true, enum: ['admin', 'user'], default: 'user' })
    role: string;

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Flip' }] })
    flips: Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);