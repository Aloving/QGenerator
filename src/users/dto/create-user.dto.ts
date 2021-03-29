import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'Name of creation user',
  })
  @IsNotEmpty()
  @IsString()
  @Length(1, 40)
  name: string;
}
