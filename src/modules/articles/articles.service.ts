import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import type { CreateArticleDto } from './dto/create-article.dto';
import type { UpdateArticleDto } from './dto/update-article.dto';

@Injectable()
export class ArticlesService {
	constructor(private prisma: PrismaService) { }

	create(createArticleDto: CreateArticleDto) {
		return 'This action adds a new article';
	}

	 getDate (givenDate = new Date()): string  {
		givenDate.setUTCHours(0, 0, 0, 0)

		return givenDate.toUTCString();
	  };

	async findAll(page: number = 1, limit: number = 10) {
		const skip = (page - 1) * limit;

		const [data, totalCount] = await Promise.all([
			this.prisma.feed.findMany({
				orderBy: { pubDate: 'desc' },
				skip,
				take: limit,

			}),
			this.prisma.feed.count(),
		]);

		return { data, totalCount };
	}

	findOne(id: number) {
		return `This action returns a #${id} article`;
	}

	update(id: number, updateArticleDto: UpdateArticleDto) {
		return `This action updates a #${id} article`;
	}

	remove(id: number) {
		return `This action removes a #${id} article`;
	}
}
