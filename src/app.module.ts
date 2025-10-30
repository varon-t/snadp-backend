import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AssessmentController } from './assessment/assessment.controller';
import { AssessmentService } from './assessment/assessment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbModule } from './db/db.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: 5432,
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASS || 'postgres',
      database: process.env.DB_NAME || 'snadp_assessment_db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // recommended false in production; use migrations
      logging: true,
    }),
    DbModule
  ],
  controllers: [AppController, AssessmentController],
  providers: [AppService, AssessmentService],
})
export class AppModule {}
