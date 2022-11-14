import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { AppointmentQuery } from "./appointment.query";
import { AppointmentService } from "./appointment.service";
import { createAppointmentDto } from "./dto/createAppointment.dto";
import { updateAppointmentDto } from "./dto/updateAppointment.dto";

@Controller("/appointment")
@UsePipes(
  new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  })
)
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}
  @Get("")
  findAll(@Query() query: AppointmentQuery) {
    const { phone } = query;
    if (phone) {
      return this.appointmentService.findByPhone(query);
    }
    return this.appointmentService.findAll();
  }

  @Post("")
  createAppointment(@Body() dto: createAppointmentDto) {
    return this.appointmentService.createAppointment(dto);
  }

  @Put("/:id")
  updateAppointment(@Param() id: number, @Body() dto: updateAppointmentDto) {
    return this.appointmentService.updateAppointment(id, dto);
  }

  @Get("/:id")
  findById(@Param() id: number) {
    return this.appointmentService.findById(+id);
  }
}
