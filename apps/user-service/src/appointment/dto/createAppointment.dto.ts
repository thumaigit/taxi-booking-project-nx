import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class createAppointmentDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  clientName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  clientPhone: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  startPoint: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  endPoint: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  carType: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  payment: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  dispatcher_id?: string;
}
