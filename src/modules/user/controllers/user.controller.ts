import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
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

  @Get(':userUuid')
  getUser(
    @Param('userUuid', ParseUUIDPipe) userUuid: string,
  ): Promise<ReadUserDto> {
    return this._userService.get(userUuid);
  }

  @Get()
  getUsers(): Promise<ReadUserDto[]> {
    return this._userService.getAll();
  }

  @Patch(':userUuid')
  updateUSer(
    @Param('userUuid', ParseUUIDPipe) userUuid: string,
    @Body() user: UpdateUserDto,
  ) {
    return this._userService.update(userUuid, user);
  }

  @Roles(RoleType.ADMIN)
  @UseGuards(AuthGuard(), RoleGuard)
  @Delete(':userUuid')
  async deleteUser(
    @Param('userUuid', ParseUUIDPipe) userUuid: string,
  ): Promise<void> {
    return this._userService.delete(userUuid);
  }

  @Roles(RoleType.ADMIN)
  @UseGuards(AuthGuard(), RoleGuard)
  @Post('setRole/:userUuid/:roleUuid')
  async setRoleToUser(
    @Param('userUuid', ParseUUIDPipe) userId: string,
    @Param('roleUuid', ParseUUIDPipe) roleId: string,
  ): Promise<boolean> {
    return this._userService.setRoleToUser(userId, roleId);
  }
}
