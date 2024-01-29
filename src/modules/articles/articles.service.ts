import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { APP_ERROR } from 'src/common/errors';
import { PrismaService } from 'src/prisma/prisma.service';

import type { CreateArticleDto } from './dto/create-article.dto';
import type { UpdateArticleDto } from './dto/update-article.dto';

@Injectable()
export class ArticlesService {
	constructor(private prisma: PrismaService) { }

	async create(createArticleDto: CreateArticleDto) {
		return await this.prisma.feed.create({ data: createArticleDto })
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
		return this.prisma.feed.findFirst({ where:{ id:id } });
	}

	update(id: number, updateArticleDto: UpdateArticleDto) {
		return this.prisma.feed.update({ where:{ id:id },data:{ ...updateArticleDto } })
	}

	remove(id: number) {
		const article = this.prisma.feed.findUnique({ where:{ id:id } })
		if (article){
			throw new HttpException(APP_ERROR.NOT_FOUND, HttpStatus.NOT_FOUND);
		}

		return this.prisma.feed.delete({ where:{ id:id } })
	}
}
