import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

    async findOne(username: string): Promise<any> {
        return this.userModel.findOne({ username }).exec();
    }

    async create(user: User): Promise<User> {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        const createdUser = new this.userModel({ ...user, password: hashedPassword });
        return createdUser.save();
    }
}
