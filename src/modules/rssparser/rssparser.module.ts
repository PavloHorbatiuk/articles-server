import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { PrismaModule } from 'src/prisma/prisma.module';

import { RssparserService } from './rssparser.service';

@Module({
	imports: [ScheduleModule.forRoot(),PrismaModule],
	providers: [RssparserService],
})
export class RssparserModule {}
