// app.module.ts
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PaceService } from './pace.service';

@Module({
  imports: [HttpModule],
  providers: [PaceService],
  exports: [PaceService],

})
export class PaceModule {}
