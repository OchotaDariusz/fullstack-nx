import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import cors from 'cors';
import { Request, Response, NextFunction } from 'express';

import { AppModule } from './app/app.module';
import { SeedService } from './seed/seed.service';

function preventCrossSiteScripting(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
}

function loggerMiddleware(req: Request, res: Response, next: NextFunction) {
  Logger.log(
    `[${new Date().toDateString()}] - [${req.ip}] - \x1b[33m[${
      req.method
    }]:\x1b[0m ${req.url}`
  );
  next();
}

async function seedDatabase(app: NestExpressApplication) {
  Logger.log('Seeding database...');
  await app.get(SeedService).seed(+process.env.SEED || 60);
  Logger.log('Seed complete.');
}

async function prepareSwagger(app: NestExpressApplication) {
  Logger.log('Creating a swagger documentation...');
  const config = new DocumentBuilder()
    .addSecurity('bearer', {
      type: 'http',
      scheme: 'bearer',
    })
    .setTitle('NestJS Backend')
    .setDescription('REST API')
    .setVersion('2.0')
    .build();
  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  };
  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('docs', app, document);
  Logger.log('Creating complete.');
}

async function prepareApplication(app: NestExpressApplication) {
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  const envMode = process.env.NODE_ENV;
  Logger.log('NODE_ENV', envMode);
  if (envMode !== 'production') {
    const seedMode = !!+process.env.SEED ?? false;
    if (seedMode) {
      await seedDatabase(app);
    }
    await prepareSwagger(app);
  }

  app.disable('x-powered-by');
  app.use(preventCrossSiteScripting);
  app.use(loggerMiddleware);
  app.use(cors());

  const port = +process.env.PORT || 3000;
  await app.listen(port);

  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });
  await prepareApplication(app);
}

bootstrap();
