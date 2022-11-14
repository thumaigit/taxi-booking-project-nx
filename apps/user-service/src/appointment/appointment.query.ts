import { Type } from "class-transformer";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString, Min } from "class-validator";

export class AppointmentQuery {
  @IsOptional()
  @ApiPropertyOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @Min(1)
  @Type(() => Number)
  @ApiPropertyOptional({ minimum: 1 })
  limit?: number;

  @IsOptional()
  @Min(0)
  @Type(() => Number)
  @ApiPropertyOptional({ default: 0 })
  offset?: number;
}
