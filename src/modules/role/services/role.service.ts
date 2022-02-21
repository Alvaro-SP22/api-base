import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../entities/role.entity';
import { RoleRepository } from '../repositories/role.repository';
import { CreateRoleDto, ReadRoleDto, UpdateRoleDto } from '../dtos/index';
import { plainToClass } from 'class-transformer';
import { status } from 'src/shared/entity-status.enum';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleRepository)
    private readonly _roleRepository: RoleRepository,
  ) {}

  async get(roleUuid: string): Promise<ReadRoleDto> {
    if (!roleUuid) {
      throw new BadRequestException('Se debe enviar un ID');
    }

    const role = await this._roleRepository.findOne({
      where: { status: status.ACTIVE, uuid: roleUuid },
    });

    if (!role) {
      throw new NotFoundException();
    }

    return plainToClass(ReadRoleDto, role);
  }

  async getAll(): Promise<ReadRoleDto[]> {
    const roles = await this._roleRepository.find({
      where: { status: status.ACTIVE },
    });

    if (!roles) {
      throw new NotFoundException();
    }

    return roles.map((role: Role) => plainToClass(ReadRoleDto, role));
  }

  async create(role: Partial<CreateRoleDto>): Promise<ReadRoleDto> {
    const savedRole: Role = await this._roleRepository.save(role);
    return plainToClass(ReadRoleDto, savedRole);
  }

  async update(
    roleUuid: string,
    role: Partial<UpdateRoleDto>,
  ): Promise<ReadRoleDto> {
    const foundRole = await this._roleRepository.findOne({
      where: { status: status.ACTIVE, uuid: roleUuid },
    });

    if (!foundRole) {
      throw new NotFoundException('El rol no existe');
    }
    foundRole.name = role.name;
    foundRole.description = role.description;

    const updatedRole = await this._roleRepository.save(foundRole);

    return plainToClass(ReadRoleDto, updatedRole);
  }

  async delete(roleUuid: string): Promise<void> {
    const roleExist = await this._roleRepository.findOne({
      where: { status: status.ACTIVE, uuid: roleUuid },
    });

    if (!roleExist) {
      throw new NotFoundException();
    }

    await this._roleRepository.update(
      { uuid: roleUuid },
      { status: status.INACTIVE },
    );
  }
}
