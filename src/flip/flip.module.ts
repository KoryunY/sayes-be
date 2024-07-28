import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Flip, FlipSchema } from './flip.schema';
import { FlipService } from './flip.service';
import { FlipController } from './flip.controller';

@Module({
    imports: [MongooseModule.forFeature([{ name: Flip.name, schema: FlipSchema }])],
    providers: [FlipService],
    controllers: [FlipController],
    exports: [FlipService],
})
export class FlipModule { }
