import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEmail } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty()
  @Expose()
  @IsEmail()
  readonly email: string;
}
