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

  @Get(':roleId')
  getRole(@Param('roleId', ParseIntPipe) roleId: number): Promise<ReadRoleDto> {
    return this._roleService.get(roleId);
  }

  @Get()
  getRoles(): Promise<ReadRoleDto[]> {
    return this._roleService.getAll();
  }

  @Post()
  createUSer(@Body() role: CreateRoleDto): Promise<ReadRoleDto> {
    return this._roleService.create(role);
  }

  @Patch(':roleId')
  @Roles(RoleType.ADMIN)
  @UseGuards(AuthGuard(), RoleGuard)
  updateUSer(
    @Param('roleId', ParseIntPipe) roleId: number,
    @Body() role: Partial<UpdateRoleDto>,
  ) {
    return this._roleService.update(roleId, role);
  }

  @Delete(':roleId')
  @Roles(RoleType.ADMIN)
  @UseGuards(AuthGuard(), RoleGuard)
  deleteRole(@Param('roleId', ParseIntPipe) roleId: number) {
    return this._roleService.delete(roleId);
  }
}
