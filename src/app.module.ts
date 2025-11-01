import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AssessmentController } from './assessment/assessment.controller';
import { AssessmentService } from './assessment/assessment.service';
import { AuditLogService } from './db/auditlog.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbModule } from './db/db.module';
import { PaceService } from './pace/pace.service';
import { PaceModule } from './pace/pace.module';
import { HttpModule } from '@nestjs/axios';
import { ChangeAuditSubscriber } from './assessment/subscriber/change.audit.subscriber';
import { ClsModule, ClsService } from 'nestjs-cls';

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
      subscribers: [__dirname + '/**/*.subscriber{.ts,.js}'],

      synchronize: true, // recommended false in production; use migrations
      logging: true,
    }),
    ClsModule.forRoot({
      global: true,
      middleware: { mount: true },
    }),
    DbModule,
    PaceModule,
    HttpModule,
  ],
  controllers: [AppController, AssessmentController],
  providers: [
    AppService,
    AssessmentService,
    //AuditLogService,
    PaceService,
    ChangeAuditSubscriber,
    //ClsService,
  ],
})
export class AppModule {}
