import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

@Exclude()
export class ReadUserDetailDto {
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
  readonly name: string;

  @ApiProperty()
  @Expose()
  @IsString()
  readonly lastname: string;
}
