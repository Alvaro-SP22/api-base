import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { RoleType } from 'src/modules/role/enums/roletype.enum';
import { UserDetails } from '../entities/user.details.entity';

export class UserDto {
  @ApiProperty()
  @IsNotEmpty()
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  roles: RoleType[];

  @ApiProperty()
  @IsNotEmpty()
  details: UserDetails;
}
