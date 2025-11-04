import { NestFactory } from '@nestjs/core';
import { AssessmentModule } from './modules/assessment.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AssessmentModule);


    const config = new DocumentBuilder()
        .setTitle('SNADP API')
        .setDescription('API documentation')
        .setVersion('1.0')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
