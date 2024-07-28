import { Module } from '@nestjs/common';
import { BotService } from './bot.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/user.schema';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [BotService],
})
export class BotModule {
  constructor(private readonly botService: BotService) {
    //this.botService.launchBot();
  }
}