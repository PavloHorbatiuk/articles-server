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

	const whitelist = ['https://articles-phi.vercel.app'];
	app.enableCors({
		origin: function (origin, callback) {
			if (whitelist.indexOf(origin) !== -1) {
				console.log('allowed cors for:', origin)
				callback(null, true)
			} else {
				console.log('blocked cors for:', origin)
				callback(new Error('Not allowed by CORS'))
			}
		},
		allowedHeaders: 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Observe',
		methods: 'GET,PUT,POST,DELETE,UPDATE,OPTIONS',
		credentials: true,
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