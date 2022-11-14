import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

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
  carType?: string;
}
