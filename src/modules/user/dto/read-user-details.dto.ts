import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsString } from 'class-validator';

@Exclude()
export class ReadUserDetailDto {
  @ApiProperty()
  @Expose()
  @IsString()
  readonly name: string;

  @ApiProperty()
  @Expose()
  @IsString()
  readonly lastname: string;
}
