import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString, Max, Min } from 'class-validator';

import { QuestionProposal } from '../entities';
import { Role, User } from '../../users';

export class QuestionProposalWithUserDto extends QuestionProposal {
  @ApiProperty({
    description: 'An proposal id',
    type: String,
  })
  @IsString()
  @Min(1)
  @Max(130)
  login: User['login'];

  @ApiProperty({
    enum: [Role.User, Role.Admin, Role.Moderator],
    description: 'User role',
  })
  @IsEnum(Role)
  role: User['role'];
}
