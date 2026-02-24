import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { CommunicationChannel } from '../../../common/enums/communication-channel.enum';
import { CommunicationDirection } from '../../../common/enums/communication-direction.enum';
import { TemplateLanguage } from '../../../common/enums/template-language.enum';

export class CreateCommunicationDto {
  @IsString()
  @IsNotEmpty()
  clientId!: string;

  @IsOptional()
  @IsString()
  tripId?: string;

  @IsEnum(CommunicationChannel)
  channel!: CommunicationChannel;

  @IsOptional()
  @IsEnum(CommunicationDirection)
  direction?: CommunicationDirection;

  @IsOptional()
  @IsEnum(TemplateLanguage)
  language?: TemplateLanguage;

  @IsOptional()
  @IsString()
  subject?: string;

  @IsString()
  @IsNotEmpty()
  message!: string;

  @IsOptional()
  @IsString()
  templateKey?: string;

  @IsOptional()
  @IsString()
  externalId?: string;

  @IsOptional()
  @IsDateString()
  sentAt?: string;
}
