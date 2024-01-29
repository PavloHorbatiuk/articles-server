import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString, MinLength, } from 'class-validator';

export class CreateArticleDto {
        @IsString()
        @IsNotEmpty()
        @ApiProperty()
        @MinLength(2)
        title: string;

        @IsString()
        @IsNotEmpty()
        @ApiProperty()
        description: string;

        @IsString()
        @IsNotEmpty()
        @ApiProperty()
        link: string;

        @Type(() => Date)@IsDate()
        pubDate: Date;
}