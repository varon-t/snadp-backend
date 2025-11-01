import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AssessmentTemplate } from './entity/assessment.template.entity';

@Injectable()
export class DbService {
  constructor(@InjectRepository(AssessmentTemplate)
    private readonly repo: Repository<AssessmentTemplate>,
  ) {}

  create(dto: AssessmentTemplate) {
  //async create(dto: AssessmentTemplate): Promise<AssessmentTemplate> {
    this.repo.insert(dto);
    //return this.repo.save(dto);
  }

  async findAll(): Promise<AssessmentTemplate[]> {
    return this.repo.find();
  }

  async findOne(id: number): Promise<AssessmentTemplate> {
    const assessment = await this.repo.findOne({ where: { id } });
    if (!assessment) {
      throw new NotFoundException(`Assessment #${id} not found`);
    }
    return assessment;
  }
}
