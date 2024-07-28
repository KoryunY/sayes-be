import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FlipModule } from './flip/flip.module';
import { TelegrafModule } from 'nestjs-telegraf';
import { BotModule } from './bot/bot.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes the module globally available
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    TelegrafModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        token: configService.get<string>('BOT_TOKEN'),
      }),
      inject: [ConfigService],
    }),
    AuthModule, UserModule, FlipModule, BotModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
