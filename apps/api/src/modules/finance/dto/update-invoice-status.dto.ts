import { IsEnum } from 'class-validator';
import { InvoiceStatus } from '../../../common/enums/invoice-status.enum';

export class UpdateInvoiceStatusDto {
  @IsEnum(InvoiceStatus)
  status!: InvoiceStatus;
}
