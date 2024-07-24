import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.schema';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RoleGuard } from 'src/auth/role.guard';
import { Roles } from 'src/auth/role.decorator';
import { UserDto } from './user.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('users')
@UseGuards(JwtAuthGuard, RoleGuard)
@ApiBearerAuth() // Indicates Bearer authentication
export class UserController {
    constructor(private readonly usersService: UserService) { }

    @Get('admin')
    @Roles('admin')
    async getSomeAdmin() {
        return "SomeAdmin";
    }

    @Get()
    @Roles('user')
    async getSome() {
        return "Some";
    }
}
