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
    .setDescription(
      'This API allows users to access, modify, and submit assessments to the PACE system. It provides endpoints for retrieving assessment data, updating assessment details, and submitting completed assessments for evaluation.',
    )
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      in: 'header',
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    customCss: '.swagger-ui .topbar { display: none; }',
  });

  app.getHttpAdapter().get('/api/json', (req, res) => {
    res.json(document);
  });
  console.log(`OpenAPI UI available at http://localhost:3000/api/docs`);
  console.log(`OpenAPI JSON available at http://localhost:3000/api/json`);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
