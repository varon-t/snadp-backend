import { Injectable, Logger } from '@nestjs/common';
import { AssessmentDto } from '../dto/assessment.dto';
import { DbService } from '../dao/db.service';
import { PaceObject, PaceService } from '../pace/pace.service';
import { AssessmentMapper } from '../mapper/assessment.mapper';

@Injectable()
export class AssessmentService {
  private readonly logger = new Logger(AssessmentService.name);

  constructor(
    private readonly dbService: DbService,
    private readonly paceService: PaceService,
  ) {}

  async getAssessmentById(assessmentId: string): Promise<AssessmentDto | null> {
    // Start fetching external pace data concurrently
    const pacePromise: Promise<PaceObject[]> = this.paceService.getData();

    // Fetch entity from DB
    const entity = await this.dbService.findOne(assessmentId);
    // Await and log the pace objects; don't let pace failures break this method
    try {
      const paceObjects = await pacePromise;
      this.logger.debug(
        `Fetched pace objects for assessment ${assessmentId}: ${JSON.stringify(
          paceObjects,
        )}`,
      );
    } catch (err) {
      this.logger.warn(
        `Unable to fetch pace objects for assessment ${assessmentId}: ${
          (err as Error)?.message ?? err
        }`,
      );
    }

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
