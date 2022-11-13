import { Module } from "@nestjs/common";
import { AppointmentService } from "../appointment/appointment.service";
import { DriverService } from "../driver/driver.service";
import { DriverToAppointmentService } from "../driverToAppointment/driverToAppointment.service";
import { NotificationGateway } from "./notification.gateway";

@Module({
  providers: [
    NotificationGateway,
    DriverService,
    DriverToAppointmentService,
    AppointmentService,
  ],
  exports: [NotificationGateway],
})
export class NotificationModule {}
