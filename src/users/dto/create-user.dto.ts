import { Exclude } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsEnum,
  MinLength,
  MaxLength,
} from 'class-validator';
import { userRole } from '../entities/user.entity';


export class CreateUserDto {
  id: number;

  @MinLength(2, {
    message: 'name is too short',
  })
  @MaxLength(50, {
    message: 'Title is too long',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  lastname: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  // @IsEnum(['client', 'employee', 'admin'])
  // @IsNotEmpty()
  role: userRole[]

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;
}
