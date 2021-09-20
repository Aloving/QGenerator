import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Role } from '../enums';
import { User } from '../entities';

export class ChangeUserRoleDto {
  @ApiProperty({
    description: 'Role to change',
    enum: Role,
  })
  @IsNotEmpty()
  @IsEnum(Role)
  role: Role;

  @ApiProperty({
    description: 'User id to change role',
  })
  @IsNotEmpty()
  @IsString()
  userId: User['id'];
}
