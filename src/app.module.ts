import { Module } from '@nestjs/common';
import { AssessmentController } from './assessment/assessment.controller';
import { AssessmentService } from './assessment/assessment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbModule } from './db/db.module';
import { PaceService } from './pace/pace.service';
import { PaceModule } from './pace/pace.module';
import { HttpModule } from '@nestjs/axios';
import { ChangeAuditSubscriber } from './subscriber/change.audit.subscriber';
import { ClsModule } from 'nestjs-cls';

@Module({
  imports: [
    ClsModule.forRoot({
      global: true,
      middleware: { mount: true },
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: 5432,
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASS || 'postgres',
      database: process.env.DB_NAME || 'snadp_assessment_db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      //subscribers: [__dirname + '/**/*.subscriber{.ts,.js}'],

      synchronize: true, // recommended false in production; use migrations
      logging: true,
    }),
    DbModule,
    PaceModule,
    HttpModule,
  ],
  controllers: [AssessmentController],
  providers: [AssessmentService, PaceService, ChangeAuditSubscriber],
})
export class AppModule {
  /*
  constructor(
    private readonly dataSource: DataSource,
    private readonly changeAuditSubscriber: ChangeAuditSubscriber,
  ) {}

  onModuleInit() {
    //this.dataSource.subscribers.push(this.changeAuditSubscriber);
  }

   */
}
