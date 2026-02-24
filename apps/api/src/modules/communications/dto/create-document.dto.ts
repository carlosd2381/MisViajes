import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { DocumentCategory } from '../../../common/enums/document-category.enum';
import { DocumentType } from '../../../common/enums/document-type.enum';
import { DocumentValidationStatus } from '../../../common/enums/document-validation-status.enum';

export class CreateDocumentDto {
  @IsOptional()
  @IsString()
  clientId?: string;

  @IsOptional()
  @IsString()
  tripId?: string;

  @IsEnum(DocumentCategory)
  category!: DocumentCategory;

  @IsEnum(DocumentType)
  docType!: DocumentType;

  @IsOptional()
  @IsEnum(DocumentValidationStatus)
  validationStatus?: DocumentValidationStatus;

  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  fileName!: string;

  @IsString()
  @IsNotEmpty()
  fileUrl!: string;

  @IsOptional()
  @IsDateString()
  expiresAt?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
