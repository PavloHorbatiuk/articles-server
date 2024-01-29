import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class AuthUserResponse {
    @ApiPropertyOptional()
    @IsOptional()
    @IsNumber()
    id?: number;

    @ApiProperty()
    @IsString()
    email: string;

    @ApiProperty()
    @IsString()
    name: string | null;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    password?: string;

    @ApiProperty()
    @IsString()
    token:string
}