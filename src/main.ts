import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';

import type { NestExpressApplication } from '@nestjs/platform-express';

declare const module: any;

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule);

	const config = new DocumentBuilder()
		.setTitle('crm')
		.setDescription('The CRM API description')
		.setVersion('0.1')
		.addTag('API')
		.build();

	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api', app, document);

	const whitelist = ['articles-phi.vercel.app/', 'api.example.com'];
	app.enableCors({
	  origin: function (origin, callback) {
			if (!origin || whitelist.indexOf(origin) !== -1) {
		  callback(null, true)
			} else {
		  callback(new Error('Not allowed by CORS'))
			}
	  },

	});

	const PORT = process.env.PORT || 5000;
	app.useGlobalPipes(new ValidationPipe())
	await app.listen(PORT);

	if (module.hot) {
		module.hot.accept();
		module.hot.dispose(() => app.close());
	}
}

bootstrap();