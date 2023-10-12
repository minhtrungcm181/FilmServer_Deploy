import {NestApplication, NestFactory} from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import {WinstonModule} from 'nest-winston';
import {AppModule} from './app.module';
import winstonLogger from './logger/app.logger';
async function bootstrap() {
  const app = await NestFactory.create<NestApplication>(AppModule, {
    logger: WinstonModule.createLogger({
      instance: winstonLogger,
    }),
    cors: true,
  });

  app.enableCors({
    origin: ['http://localhost:9000', 'http://localhost:3000'],
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    credentials: true,
  });

  const port = process.env.NODE_ENV === 'production' ? 80 : 5000;
  console.log('running on port:' + port);
  app.use(cookieParser());
  await app.listen(port);
}
bootstrap();
