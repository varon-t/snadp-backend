import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AuthGuard } from './guard/auth.guard';
import { ExceptionsFilter } from './exception/exceptions.filter';
import { DetailedLoggingInterceptor } from './interceptor/logging.interceptor';
import { setupSwagger } from './swagger/swagger.setup';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  // app.useGlobalGuards(new AuthGuard());
  app.useGlobalFilters(new ExceptionsFilter());
  app.useGlobalInterceptors(new DetailedLoggingInterceptor());

  // Configure Swagger/OpenAPI
  setupSwagger(app);

  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
