import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type FlipDocument = Flip & Document;

@Schema({ timestamps: true })
export class Flip {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    result: string;

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    author: Types.ObjectId;

    @Prop()
    authorFlip: boolean;

    @Prop({ type: Types.ObjectId, ref: 'User' })
    guest: Types.ObjectId;

    @Prop()
    guestFlip: boolean;

    @Prop({ required: true })
    code: string;

    @Prop({ required: true, default: Date.now })
    createdAt: Date;

    @Prop({ required: true, default: Date.now })
    updatedAt: Date;
}

export const FlipSchema = SchemaFactory.createForClass(Flip);