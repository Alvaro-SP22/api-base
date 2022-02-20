import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '../../role/decorators/role.decorator';
import { RoleGuard } from '../../role/guards/role.guard';
import { RoleType } from '../../role/enums/roletype.enum';
import { ReadUserDto, UpdateUserDto } from '../dto';
import { UserService } from '../services/user.service';

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(AuthGuard())
@Controller('users')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Get(':userId')
  getUser(@Param('userId', ParseIntPipe) userId: number): Promise<ReadUserDto> {
    return this._userService.get(userId);
  }

  @Get()
  getUsers(): Promise<ReadUserDto[]> {
    return this._userService.getAll();
  }

  @Patch(':userId')
  updateUSer(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() user: UpdateUserDto,
  ) {
    return this._userService.update(userId, user);
  }

  @Delete(':userId')
  @Roles(RoleType.ADMIN)
  @UseGuards(AuthGuard(), RoleGuard)
  async deleteUser(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<void> {
    return this._userService.delete(userId);
  }

  @Post('setRole/:userId/:roleId')
  @Roles(RoleType.ADMIN)
  @UseGuards(AuthGuard(), RoleGuard)
  async setRoleToUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('roleId', ParseIntPipe) roleId: number,
  ): Promise<boolean> {
    return this._userService.setRoleToUser(userId, roleId);
  }
}
