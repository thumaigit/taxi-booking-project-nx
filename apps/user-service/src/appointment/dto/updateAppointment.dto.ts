import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class updateAppointmentDto {
  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  clientName?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  clientPhone?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  startPoint?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  endPoint?: string;
}
