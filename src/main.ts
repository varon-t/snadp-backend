import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AuthGuard } from './guard/auth.guard';
import { ExceptionsFilter } from './exception/exceptions.filter';
import { DetailedLoggingInterceptor } from './interceptor/logging.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  // app.useGlobalGuards(new AuthGuard());
  app.useGlobalFilters(new ExceptionsFilter());
  app.useGlobalInterceptors(new DetailedLoggingInterceptor());

  // Configure OpenAPI
  const config = new DocumentBuilder()
    .setTitle('Support Needs Assessment Digital Platform')
    .setDescription('API documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    customCss: '.swagger-ui .topbar { display: none; }',
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
