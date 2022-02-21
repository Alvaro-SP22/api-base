import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { IsEmail, IsNumber, IsString } from 'class-validator';
import { ReadRoleDto } from 'src/modules/role/dtos';
import { ReadUserDetailDto } from './read-user-details.dto';

export class ReadUserDto {
  @ApiProperty()
  @Exclude()
  @IsNumber()
  readonly id: number;

  @ApiProperty()
  @Expose()
  @IsString()
  readonly uuid: string;

  @ApiProperty()
  @Expose()
  @IsString()
  readonly username: string;

  @ApiProperty()
  @Expose()
  @IsEmail()
  readonly email: string;

  @Exclude()
  readonly password: string;

  @ApiProperty()
  @Type(() => ReadUserDetailDto)
  readonly details: ReadUserDetailDto;

  @ApiProperty()
  @Type(() => ReadRoleDto)
  readonly roles: ReadRoleDto;
}
