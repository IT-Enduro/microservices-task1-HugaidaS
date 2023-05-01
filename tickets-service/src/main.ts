import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1', { exclude: ['manage/health'] });
  await app.listen(8080);
}
bootstrap().then(() => console.log('Tickets service started'));
