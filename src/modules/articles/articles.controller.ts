import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@ApiTags('articles')
@Controller('articles')
export class ArticlesController {
	constructor(private readonly articlesService: ArticlesService) {}

	@ApiTags('API')
	@Post()
	create(@Body() createArticleDto: CreateArticleDto) {
		return this.articlesService.create(createArticleDto);
	}

	@ApiTags('API')
	@Get()
	findAll(@Query('page') page: number = 1,
		@Query('limit') limit: number = 10,) {
		return this.articlesService.findAll(+page, +limit);
	}

	@ApiTags('API')
	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.articlesService.findOne(+id);
	}

	@ApiTags('API')
	@Patch(':id')
	update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
		return this.articlesService.update(+id, updateArticleDto);
	}

	@ApiTags('API')
	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.articlesService.remove(+id);
	}
}
