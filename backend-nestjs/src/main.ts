import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {

  const app =
    await NestFactory.create(
      AppModule
    );

  // =====================================================
  // CORS
  // =====================================================

  app.enableCors({
    origin: 'http://localhost:4200',
  });

  // =====================================================
  // PREFIJO API
  // =====================================================

  app.setGlobalPrefix('api');

  await app.listen(3000);

  console.log(
    'Backend ejecutándose en http://localhost:3000'
  );
}

bootstrap();