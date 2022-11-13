import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { DriverToAppointmentQuery } from "./driverToAppointment.query";
import { DriverToAppointmentService } from "./driverToAppointment.service";

@Controller("/driver-appointment")
@UsePipes(
  new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  })
)
export class DriverToAppointmentController {
  constructor(
    private readonly driverToAppointmentService: DriverToAppointmentService
  ) {}

  @Get("")
  findByAppointmentId(@Query() query: DriverToAppointmentQuery) {
    const { appointmentId } = query;
    return this.driverToAppointmentService.findByAppointmentId(+appointmentId);
  }
}
