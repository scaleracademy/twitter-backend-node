import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Use Response Compression
  app.use(compression());

  await app.listen(3000);
}
bootstrap();
