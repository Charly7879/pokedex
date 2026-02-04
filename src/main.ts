import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /** Prefijo global */
  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    /** ValidationPipe */
    new ValidationPipe({
      whitelist: true, // Permitir campos sólo del dto
      forbidNonWhitelisted: true, // Mensaje que la propiedad no está permitida
      transform: true, // Transformar los datos en tipos Ej: number, string, boolean, etc
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0');
}
bootstrap();
