import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true,
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'x-tenant-slug'],
  });
  // Listen on PORT env var or fallback
  const port = process.env.PORT || 4001;
  await app.listen(port);
  console.log(`Control Plane API is running on: ${await app.getUrl()}`);
}
bootstrap();
