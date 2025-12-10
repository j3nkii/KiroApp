import { IsNumber, IsString, IsEmail, IsArray, IsEnum, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CustomerDto {
  @IsNumber()
  id: number;

  @IsString()
  fullName: string;

  @IsString()
  primaryPhone: string;

  @IsEmail()
  email: string;
}

export class LineItemDto {
  @IsNumber()
  id: number;

  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  sku?: string;

  @IsEnum(['service', 'product'])
  itemType: 'service' | 'product';

  @IsNumber()
  currentPrice: number;
}

export class WorkOrderDetailDto {
  @IsNumber()
  id: number;

  @IsNumber()
  quantity: number;

  @IsNumber()
  cachedPrice: number;

  @ValidateNested()
  @Type(() => LineItemDto)
  lineItem: LineItemDto;
}

export class WorkOrderDto {
  @IsNumber()
  id: number;

  @IsString()
  dateCreated: string;

  @IsString()
  lastUpdated: string;

  @ValidateNested()
  @Type(() => CustomerDto)
  customer: CustomerDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => WorkOrderDetailDto)
  details: WorkOrderDetailDto[];

  @IsNumber()
  totalAmount: number;
}