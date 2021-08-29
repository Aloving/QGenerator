import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TokenRefreshDto {
  @ApiProperty({
    description: 'Refresh token to get a new one',
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  readonly refreshToken: string;
}
