import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiQuery, ApiSecurity, ApiTags } from '@nestjs/swagger';

import { Role } from '@fullstack/types';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from '../auth/roles/roles.decorator';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('users')
@ApiSecurity('bearer')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  @ApiQuery({ name: 'count', required: false, type: Boolean })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN)
  getAllUsers(
    @Query('count') count?: boolean,
    @Query('page') page?: number,
    @Query('limit') limit?: number
  ) {
    if (count && !page) return this.userService.countAll();
    if (!count && page && !limit) return this.userService.getUsers(+page, 5);
    if (!count && page && limit)
      return this.userService.getUsers(+page, +limit);
    if (!count && !page) return this.userService.getAllUsers();
    throw new BadRequestException();
  }

  @Get('/:uuid')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN)
  getUser(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return this.userService.getUserById(uuid);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN)
  @HttpCode(201)
  @UsePipes(ValidationPipe)
  postNewUser(@Body() userDto: CreateUserDto) {
    return this.userService.addNewUser(userDto);
  }

  @Patch('/:uuid')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN)
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  patchUser(
    @Param('uuid', new ParseUUIDPipe()) uuid: string,
    @Body() userDto: UpdateUserDto
  ) {
    return this.userService.updateUser(uuid, userDto);
  }

  @Delete('/:uuid')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN)
  @HttpCode(204)
  deleteUser(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return this.userService.deleteUser(uuid);
  }
}
