import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class updateDriverDto {
  @IsOptional()
  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  password?: string;

  @IsOptional()
  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  carName?: string;

  @IsOptional()
  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  carType?: string;

  @IsOptional()
  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  carLicense?: string;

  @IsOptional()
  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  currentAddress?: string;
}
