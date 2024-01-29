import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateUserDTO {
    @IsString()
    @MinLength(2)
    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    @ApiProperty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @ApiProperty()
    password: string;
}

export class UpdateUserDTO{
    @IsString()
    @MinLength(2)
    @ApiProperty()
    name: string;

    @IsOptional()
    @IsEmail()
    @ApiPropertyOptional()
    email?: string;
}