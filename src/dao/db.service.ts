import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { AssessmentTemplate } from './entity/assessment.template.entity';
//import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class DbService {
  constructor(
    @InjectRepository(AssessmentTemplate)
    private readonly repo: Repository<AssessmentTemplate>,
  ) {}

  async create(dto: AssessmentTemplate): Promise<AssessmentTemplate> {
    //dto.id_1 = uuidv4();
    return this.repo.save(dto);
  }

  async update(dto: AssessmentTemplate): Promise<AssessmentTemplate> {
    return this.repo.save(dto);
  }

  async findAll(): Promise<AssessmentTemplate[]> {
    return this.repo.find();
  }

  async findOne(id: string): Promise<AssessmentTemplate> {
    const assessment = await this.repo.findOne({ where: { id } });
    if (!assessment) {
      throw new NotFoundException(`Assessment #${id} not found`);
    }
    return assessment;
  }
}
