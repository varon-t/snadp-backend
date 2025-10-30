import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbService } from './db.service';
import { AssessmentTemplate } from './entity/assessment.template.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AssessmentTemplate])],
  providers: [DbService],
  exports: [DbService], // if other modules need DbService
})
export class DbModule {}