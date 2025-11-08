import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule, OpenAPIObject } from '@nestjs/swagger';
import { Request, Response } from 'express';

export function setupSwagger(app: INestApplication) {
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

  const document: OpenAPIObject = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    customCss: '.swagger-ui .topbar { display: none; }',
  });

  // Expose raw OpenAPI JSON
  app.getHttpAdapter().get('/api/json', (req: Request, res: Response) => {
    res.json(document);
  });

  // Helpful console pointers
  // Note: the host/port info depends on how the app is started; these are useful defaults
  console.log(`OpenAPI UI available at http://localhost:3000/api/docs`);
  console.log(`OpenAPI JSON available at http://localhost:3000/api/json`);
}
