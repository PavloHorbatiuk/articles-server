import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import axios from 'axios';
import { APP_ERROR } from 'src/common/errors';
import { PrismaService } from 'src/prisma/prisma.service';
import { parseString } from 'xml2js';

import type { FeedSchema } from './entities/feed.entity';
import type { RssFeed } from './entities/feed.entity';

@Injectable()
export class RssparserService {
	constructor(private prisma: PrismaService) { }

	private mapRssItem(item: FeedSchema): FeedSchema {
		return {
			title: item.title,
			description: item.description,
			guid: item.guid,
			link: item.link,
			pubDate: new Date(item.pubDate),
		};
	}

	@Cron(CronExpression.EVERY_10_MINUTES)
	async handleCron() {
		try {
			const result = await this.getRssFeed();
			const existingArticles = await this.prisma.feed.findMany({ select: { title: true , pubDate:true } });
			const newItems = result.filter(item => !existingArticles.some(existing => existing.title === item.title));
			if (newItems.length > 0 ) await this.prisma.feed.createMany({ data:newItems })
		} catch (error) {
			throw new HttpException(APP_ERROR.CANT_LOAD_FEED, HttpStatus.BAD_REQUEST);
		}
	}


	async getRssFeed(): Promise<FeedSchema[]> {
		const feedUrl = 'https://feeds.bbci.co.uk/news/world/rss.xml';

		try {
			const response = await axios.get(feedUrl);
			const xmlData = response.data;

			const parsedData = await new Promise<RssFeed>((resolve, reject) => {
				parseString(xmlData, { explicitArray: false, mergeAttrs: true }, (err, result) => {
					if (err) {
						reject(err);
					} else {
						resolve(result as RssFeed);
					}
				});
			});

			const items:FeedSchema[] = parsedData.rss.channel.item;

			const extractedData = items.map((item) => this.mapRssItem(item));


			return extractedData;
		} catch (error) {
			throw new HttpException(APP_ERROR.CANT_LOAD_FEED, HttpStatus.BAD_REQUEST);
		}
	}
}
