import { IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetRandomQuestionDto {
  @ApiProperty({
    description: 'Ids to exclude',
  })
  @IsArray()
  excludeQuestionIds: string[];
}
