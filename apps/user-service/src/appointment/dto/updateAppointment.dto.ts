import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class updateAppointmentDto {
  @IsOptional()
  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  clientName?: string;

  @IsOptional()
  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  clientPhone?: string;

  @IsOptional()
  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  startPoint?: string;

  @IsOptional()
  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  endPoint?: string;

  @IsOptional()
  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  driverId?: string;
}
