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

  async get(id: number): Promise<ReadUserDto> {
    if (!id) {
      throw new BadRequestException('Se debe enviar un ID');
    }

    const user = await this._userRepository.findOne(id, {
      where: { status: status.ACTIVE },
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

  async update(userId: number, user: UpdateUserDto): Promise<ReadUserDto> {
    const foundUSer = await this._userRepository.findOne(userId, {
      where: { status: 'ACTIVE' },
    });

    if (!foundUSer) {
      throw new NotFoundException('El usuario no existe');
    }

    foundUSer.email = user.email;
    const updatedUser = await this._userRepository.save(foundUSer);
    return plainToClass(ReadUserDto, updatedUser);
  }

  async delete(userId: number): Promise<void> {
    const userExist = await this._userRepository.findOne(userId, {
      where: { status: status.ACTIVE },
    });

    if (!userExist) {
      throw new NotFoundException();
    }

    await this._userRepository.update(userId, { status: status.INACTIVE });
  }

  async setRoleToUser(userId: number, roleId: number): Promise<boolean> {
    const userExist = await this._userRepository.findOne(userId, {
      where: { status: status.ACTIVE },
    });

    if (!userExist) {
      throw new NotFoundException('No existe el usuario');
    }

    const roleExist = await this._roleRepository.findOne(roleId, {
      where: { status: status.ACTIVE },
    });

    if (!roleExist) {
      throw new NotFoundException('No existe el rol');
    }

    userExist.roles.push(roleExist);
    await this._userRepository.save(userExist);

    return true;
  }
}
