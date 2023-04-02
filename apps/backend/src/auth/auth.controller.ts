import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';

import { User } from '@fullstack/interfaces';
import { Role } from '@fullstack/types';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { Roles } from './roles/roles.decorator';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@ApiTags('auth')
@ApiSecurity('bearer')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  @UsePipes(ValidationPipe)
  async register(@Body() user: CreateUserDto) {
    return this.authService.register(user);
  }

  @Post('/login')
  @UseGuards(LocalAuthGuard)
  @UsePipes(ValidationPipe)
  async login(@Body() user: CreateUserDto) {
    return this.authService.login(user);
  }

  @Get('/current')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN, Role.USER)
  getCurrentUser(@Request() req) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...user } = req.user;
    return user as User;
  }
}
