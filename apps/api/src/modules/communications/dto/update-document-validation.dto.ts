import { IsEnum } from 'class-validator';
import { DocumentValidationStatus } from '../../../common/enums/document-validation-status.enum';

export class UpdateDocumentValidationDto {
  @IsEnum(DocumentValidationStatus)
  validationStatus!: DocumentValidationStatus;
}
