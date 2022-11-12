import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class updateDriverDto {
  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  password?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  carName?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  carType?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  carLicense?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  currentAddress?: string;
}
