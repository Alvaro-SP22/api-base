import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsNumber, IsString, MaxLength } from 'class-validator';

@Exclude()
export class ReadRoleDto {
  @ApiProperty()
  @Expose({ name: 'indentificador' })
  @IsNumber()
  readonly id: number;

  @ApiProperty()
  @Expose()
  @MaxLength(50, { message: 'El nombre no es válido' })
  @IsString()
  readonly name: string;

  @ApiProperty()
  @Expose()
  @MaxLength(200, { message: 'La descripción no es válida' })
  @IsString()
  readonly description: string;
}
