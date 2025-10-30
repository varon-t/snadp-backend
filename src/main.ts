import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AuthGuard } from './guard/auth.guard';
import { ExceptionsFilter } from './exception/exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  // app.useGlobalGuards(new AuthGuard());
  app.useGlobalFilters(new ExceptionsFilter());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
