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
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CreateRoleDto, ReadRoleDto, UpdateRoleDto } from '../dtos';
import { RoleService } from '../services/role.service';
import { RoleGuard } from '../guards/role.guard';
import { RoleType } from '../enums/roletype.enum';
import { Roles } from '../decorators/role.decorator';

@ApiTags('Roles')
@UseGuards(AuthGuard())
@Controller('roles')
export class RoleController {
  constructor(private readonly _roleService: RoleService) {}

  @Get(':roleUuid')
  getRole(
    @Param('roleUuid', ParseUUIDPipe) roleUuid: string,
  ): Promise<ReadRoleDto> {
    return this._roleService.get(roleUuid);
  }

  @Get()
  getRoles(): Promise<ReadRoleDto[]> {
    return this._roleService.getAll();
  }

  @Post()
  createRole(@Body() role: CreateRoleDto): Promise<ReadRoleDto> {
    return this._roleService.create(role);
  }

  @Roles(RoleType.ADMIN)
  @UseGuards(AuthGuard(), RoleGuard)
  @Patch(':roleUuid')
  updateUSer(
    @Param('roleUuid', ParseUUIDPipe) roleUuid: string,
    @Body() role: Partial<UpdateRoleDto>,
  ) {
    return this._roleService.update(roleUuid, role);
  }

  @Delete(':roleUuid')
  @Roles(RoleType.ADMIN)
  @UseGuards(AuthGuard(), RoleGuard)
  deleteRole(@Param('roleUuid', ParseUUIDPipe) roleUuid: string) {
    return this._roleService.delete(roleUuid);
  }
}
