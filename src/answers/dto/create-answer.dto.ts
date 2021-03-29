import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

import { User } from '../../users';

export class CreateAnswerDto {
  @ApiProperty({
    description: 'Text of an answer',
    maxLength: 350,
    minLength: 1,
    type: String,
  })
  @IsNotEmpty()
  @Length(1, 350)
  text: string;

  @ApiProperty({
    description: 'Question id that answer should be bound to',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  questionId: string;

  @ApiProperty({
    description: 'Start count of like',
    type: Number,
  })
  @IsNumber()
  likes: number;

  @ApiProperty({
    description: 'Start count of dislike',
    type: Number,
  })
  @IsNumber()
  dislikes: number;

  @ApiProperty({
    description: 'Author id that answer should be bound to',
    type: Number,
  })
  @IsNotEmpty()
  @IsString()
  authorId: User['id'];
}
