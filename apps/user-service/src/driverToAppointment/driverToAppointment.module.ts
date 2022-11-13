import { Module } from "@nestjs/common";
import { DriverToAppointmentController } from "./driverToAppointment.controller";
import { DriverToAppointmentService } from "./driverToAppointment.service";

@Module({
  controllers: [DriverToAppointmentController],
  providers: [DriverToAppointmentService],
})
export class DriverToAppointmentModule {}
