import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { AssessmentTemplateEntity } from './entity/assessment.template.entity';
//import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class DbService {
  constructor(
    @InjectRepository(AssessmentTemplateEntity)
    private readonly repo: Repository<AssessmentTemplateEntity>,
  ) {}

  async create(
    dto: AssessmentTemplateEntity,
  ): Promise<AssessmentTemplateEntity> {
    //dto.id_1 = uuidv4();
    return this.repo.save(dto);
  }

  async update(
    dto: AssessmentTemplateEntity,
  ): Promise<AssessmentTemplateEntity> {
    return this.repo.save(dto);
  }

  async update1(dto: AssessmentTemplateEntity): Promise<UpdateResult> {
    return this.repo.update(
      { id: dto.id }, // Criteria (WHERE clause)
      {
        id: dto.id,
        template: dto.template,
        description: dto.description,
        status: dto.status,
      },
    );
  }

  async findAll(): Promise<AssessmentTemplateEntity[]> {
    return this.repo.find();
  }

  async findOne(id: string): Promise<AssessmentTemplateEntity> {
    const assessment = await this.repo.findOne({ where: { id } });
    if (!assessment) {
      throw new NotFoundException(`Assessment #${id} not found`);
    }
    return assessment;
  }
}
