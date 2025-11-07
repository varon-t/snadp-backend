import { Injectable } from '@nestjs/common';
import { AssessmentDto } from '../dto/assessment.dto';
import { DbService } from '../dao/db.service';
import { PaceService } from '../pace/pace.service';
import { AssessmentMapper } from '../mapper/assessment.mapper';

@Injectable()
export class AssessmentService {
  constructor(
    private readonly dbService: DbService,
    private readonly paceService: PaceService,
  ) {}
  async getAssessmentById(assessmentId: string) {
    const entity = await this.dbService.findOne(assessmentId);
    return entity ? AssessmentMapper.toDto(entity) : null;
  }

  async createAssessment(assessmentDto: AssessmentDto) {
    const entity = AssessmentMapper.toEntity(assessmentDto);
    const saved = await this.dbService.create(entity);
    return AssessmentMapper.toDto(saved);
  }

  async updateAssessment(assessmentDto: AssessmentDto) {
    const entity = AssessmentMapper.toEntity(assessmentDto);
    const updated = await this.dbService.update(entity);
    return AssessmentMapper.toDto(updated);
  }
}
