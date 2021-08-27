import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class CreateUserDto {
  @ApiProperty({
    description: "Name of creation user",
  })
  @IsNotEmpty()
  @IsString()
  @Length(1, 40)
  login: string;

  @ApiProperty({
    description: "Password",
  })
  @IsNotEmpty()
  @IsString()
  @Length(6, 30)
  password: string;

  @ApiProperty({
    description: "Email",
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
