import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class DriverToAppointmentQuery {
  @IsOptional()
  @ApiProperty()
  @IsString()
  appointmentId?: string;
}
