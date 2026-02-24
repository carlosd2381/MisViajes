import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { ItineraryItemType } from '../../../common/enums/itinerary-item-type.enum';

export class CreateItineraryItemDto {
  @IsInt()
  @Min(1)
  dayNumber!: number;

  @IsEnum(ItineraryItemType)
  itemType!: ItineraryItemType;

  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  startTime?: string;

  @IsOptional()
  @IsString()
  endTime?: string;

  @IsOptional()
  @IsString()
  confirmation?: string;

  @IsOptional()
  @IsString()
  providerName?: string;

  @IsOptional()
  @IsString()
  location?: string;
}
