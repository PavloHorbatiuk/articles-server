import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@ApiTags('articles')
@Controller('articles')
export class ArticlesController {
	constructor(private readonly articlesService: ArticlesService) {}

	@ApiTags('API')
	@UseGuards(JwtAuthGuard)
	@Post('create')
	create(@Body() createArticleDto: CreateArticleDto) {
		return this.articlesService.create(createArticleDto);
	}

	@ApiTags('API')
	@UseGuards(JwtAuthGuard)
	@Get()
	findAll(@Query('page') page: number ,
		@Query('limit') limit: number,) {
		return this.articlesService.findAll(+page, +limit);
	}

	@ApiTags('API')
	@UseGuards(JwtAuthGuard)
	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.articlesService.findOne(+id);
	}

	@ApiTags('API')
	@UseGuards(JwtAuthGuard)
	@Patch('update/:id')
	update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
		return this.articlesService.update(+id, updateArticleDto);
	}

	@ApiTags('API')
	@UseGuards(JwtAuthGuard)
	@Delete('delete/:id')
	remove(@Param('id') id: string) {
		return this.articlesService.remove(+id);
	}
}
