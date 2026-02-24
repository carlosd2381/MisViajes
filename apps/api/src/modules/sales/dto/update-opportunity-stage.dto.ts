import { IsEnum } from 'class-validator';
import { OpportunityStage } from '../../../common/enums/opportunity-stage.enum';

export class UpdateOpportunityStageDto {
  @IsEnum(OpportunityStage)
  stage!: OpportunityStage;
}
