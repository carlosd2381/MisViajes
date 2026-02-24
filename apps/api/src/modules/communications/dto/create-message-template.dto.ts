import { IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CommunicationChannel } from '../../../common/enums/communication-channel.enum';
import { TemplateLanguage } from '../../../common/enums/template-language.enum';

export class CreateMessageTemplateDto {
  @IsString()
  @IsNotEmpty()
  key!: string;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsEnum(CommunicationChannel)
  channel!: CommunicationChannel;

  @IsOptional()
  @IsEnum(TemplateLanguage)
  language?: TemplateLanguage;

  @IsOptional()
  @IsString()
  subject?: string;

  @IsString()
  @IsNotEmpty()
  body!: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
