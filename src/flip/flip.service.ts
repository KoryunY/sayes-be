import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { FlipDocument, Flip, } from './flip.schema';
import { FlipDto } from './flip.dto';

@Injectable()
export class FlipService {
    constructor(@InjectModel(Flip.name) private flipModel: Model<FlipDocument>) { }

    async findOne(username: string): Promise<any> {
        return this.flipModel.findOne({ username }).exec();
    }

    async findById(id: string): Promise<any> {
        return this.flipModel.findById(id).exec();
    }

    async flipById(id: string, userId: Types.ObjectId): Promise<any> {
        const flip: Flip = await this.findById(id);
        const user = new Types.ObjectId(userId);

        if (flip.guestFlip && flip.guestFlip == flip.authorFlip) {
            return Promise.reject("already done");
        }

        if (flip.author == user) {
            flip.authorFlip = !flip.authorFlip;
        }
        else if (flip.guest == user) {
            flip.guestFlip = !flip.guestFlip
        }
        else {
            return Promise.reject("invalid user");
        }

        if (flip.guestFlip && flip.guestFlip == flip.authorFlip) {
            Promise.resolve(true);
        }
        else {
            Promise.resolve(false);
        }
    }

    async findAll(userId: string): Promise<any> {
        const objectId = new Types.ObjectId(userId);

        return this.flipModel.find({
            $or: [
                { author: objectId },
                { guest: objectId }
            ]
        }).sort({ updatedAt: -1 }) // Sort by updatedAt in descending order
            .exec();
    }

    async create(flip: FlipDto): Promise<Flip> {
        const createdFlip = new this.flipModel({ ...flip });
        return createdFlip.save();
    }
}
