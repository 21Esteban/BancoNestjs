import { IsString, MinLength, IsEmail } from 'class-validator';

export class LoginUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(3)
  password: string;
}