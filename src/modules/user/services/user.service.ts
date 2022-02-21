import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { status } from 'src/shared/entity-status.enum';
import { RoleRepository } from '../../role/repositories/role.repository';
import { ReadUserDto, UpdateUserDto } from '../dto';
import { User } from '../entities/user.entity';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly _userRepository: UserRepository,
    @InjectRepository(RoleRepository)
    private readonly _roleRepository: RoleRepository,
  ) {}

  async get(userUuid: string): Promise<ReadUserDto> {
    if (!userUuid) {
      throw new BadRequestException('Se debe enviar un UUID');
    }

    const user = await this._userRepository.findOne({
      where: { status: status.ACTIVE, uuid: userUuid },
    });

    if (!user) {
      throw new NotFoundException();
    }

    return plainToClass(ReadUserDto, user);
  }

  async getAll(): Promise<ReadUserDto[]> {
    const users = await this._userRepository.find({
      where: { status: status.ACTIVE },
    });

    if (!users) {
      throw new NotFoundException();
    }

    return users.map((user: User) => plainToClass(ReadUserDto, user));
  }

  async update(userUuid: string, user: UpdateUserDto): Promise<ReadUserDto> {
    const foundUSer = await this._userRepository.findOne({
      where: { status: 'ACTIVE', uuid: userUuid },
    });

    if (!foundUSer) {
      throw new NotFoundException('El usuario no existe');
    }

    foundUSer.email = user.email;
    const updatedUser = await this._userRepository.save(foundUSer);
    return plainToClass(ReadUserDto, updatedUser);
  }

  async delete(userUuid: string): Promise<void> {
    const userExist = await this._userRepository.findOne({
      where: { status: status.ACTIVE, uuid: userUuid },
    });

    if (!userExist) {
      throw new NotFoundException();
    }

    await this._userRepository.update(
      { uuid: userUuid },
      { status: status.INACTIVE },
    );
  }

  async setRoleToUser(userUuid: string, roleUuid: string): Promise<boolean> {
    const userExist = await this._userRepository.findOne({
      where: { status: status.ACTIVE, uuid: userUuid },
    });

    if (!userExist) {
      throw new NotFoundException('No existe el usuario');
    }

    const roleExist = await this._roleRepository.findOne({
      where: { status: status.ACTIVE, uuid: roleUuid },
    });

    if (!roleExist) {
      throw new NotFoundException('No existe el rol');
    }

    userExist.roles.push(roleExist);
    await this._userRepository.save(userExist);

    return true;
  }
}
