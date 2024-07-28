import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InjectBot } from 'nestjs-telegraf';
import { UserDto } from 'src/user/user.dto';
import { User, UserDocument } from 'src/user/user.schema';
import { UserService } from 'src/user/user.service';
import { Telegraf } from 'telegraf';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class BotService {
    constructor(
        @InjectBot() private readonly bot: Telegraf,
        @InjectModel(User.name) private userModel: Model<UserDocument>,
    ) {
        this.setupBot();
    }

    private setupBot() {
        this.bot.start(this.start);
        this.bot.command('hello', this.hello);
        this.bot.on('text', this.reply);
    }

    start = async (ctx) => {
        const user = await this.userModel.findOne({ userId: ctx.from.id });

        if (!user) {
            const hashedPassword = await bcrypt.hash((ctx.from.username || ctx.from.id.toString()), 10);
            const newUser = new this.userModel({
                userId: ctx.from.id,
                username: ctx.from.username || ctx.from.id,
                password: hashedPassword,
                role: 'user'
            });

            await newUser.save();
            ctx.reply('Welcome, new user!');
        } else {
            ctx.reply('Welcome back!');
            ctx.reply('Welcome!', {
                reply_markup: {
                    inline_keyboard: [[
                        { text: "Open flip-flop-flip app", web_app: { url: "https://www.youtube.com/" } }
                    ]]
                }
            })
        }
    };

    hello = (ctx) => ctx.reply('Hello!');
    reply = (ctx) => ctx.reply(`You said: ${ctx.message.text}`);
    // launchBot() {
    //     this.bot.launch();
    // }
}
