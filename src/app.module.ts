import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ArticlesModule } from './modules/articles/articles.module';
import { AuthModule } from './modules/auth/auth.module';
import { RssparserModule } from './modules/rssparser/rssparser.module';
import { TokenModule } from './modules/token/token.module';
import { UsersModule } from './modules/users/users.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
	imports: [
		UsersModule,
		AuthModule,
		PrismaModule,
		ConfigModule.forRoot({ envFilePath: '.env' }),
		TokenModule,
		RssparserModule,
		ArticlesModule
	],
	controllers: [],
	providers: [],
})
export class AppModule { }
