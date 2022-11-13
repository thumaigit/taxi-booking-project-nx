import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class createDriverDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  status: string;

  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  carName?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  carType: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  carLicense: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  currentAddress: string;
}
