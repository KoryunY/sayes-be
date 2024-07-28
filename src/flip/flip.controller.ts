import { Controller, Post, Body, UseGuards, Get, Query } from '@nestjs/common';
import { FlipService } from './flip.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RoleGuard } from 'src/auth/role.guard';
import { Roles } from 'src/auth/role.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';
import { FlipDto } from './flip.dto';
import { GetUser } from 'src/auth/user.decorator';
import { User } from 'src/user/user.schema';

@Controller('flips')
@UseGuards(JwtAuthGuard, RoleGuard)
@ApiBearerAuth() // Indicates Bearer authentication
export class FlipController {
    constructor(private readonly flipService: FlipService) { }

    // @Get('admin')
    // @Roles('admin')
    // async getSomeAdmin() {
    //     return "SomeAdmin";
    // }

    @Post()
    @Roles('user')
    async addFlip(@Body() flip: FlipDto) {
        return this.flipService.create(flip);
    }

    @Get()
    @Roles('user')
    async getAll(@Query('id') id: string): Promise<any> {
        return this.flipService.findAll(id);
    }

    @Get('flip')
    @Roles('user')
    async getOne(@Query('id') id: string): Promise<any> {
        return this.flipService.findById(id);
    }

    @Post('flip')
    @Roles('user')
    async flipOne(@Query('id') id: string, @GetUser() user: any): Promise<any> {
        return this.flipService.flipById(id, user.userId);
    }
}
