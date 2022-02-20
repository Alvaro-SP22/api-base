import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty()
  @MaxLength(50, { message: 'El nombre no es válido' })
  @IsString()
  readonly name: string;

  @ApiProperty()
  @MaxLength(200, { message: 'La descripción no es válida' })
  @IsString()
  readonly description: string;
}
