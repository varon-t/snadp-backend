import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'assessment_template' }) //, schema: 'snadp_assessment_db' })
export class AssessmentTemplate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: false })
  template: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  status?: string;
}
