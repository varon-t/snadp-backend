import {
  Entity,
  PrimaryGeneratedColumn,
  Column
} from 'typeorm';

@Entity({ name: 'assessment_template'})//, schema: 'snadp_assessment_db' })
export class AssessmentTemplate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  template: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  status?: string;
}