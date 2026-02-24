import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { LeadStatus } from '../../../common/enums/lead-status.enum';

export class CreateLeadDto {
  @IsString()
  source!: string;

  @IsString()
  @IsNotEmpty()
  clientId!: string;

  @IsOptional()
  @IsString()
  score?: string;

  @IsOptional()
  @IsEnum(LeadStatus)
  status?: LeadStatus;

  @IsOptional()
  @IsNumber()
  @Min(0)
  expectedBudget?: number;

  @IsOptional()
  @IsString()
  timeline?: string;
}
