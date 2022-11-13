import { Module } from "@nestjs/common";
import { DriverService } from "../driver/driver.service";
import { DriverToAppointmentService } from "../driverToAppointment/driverToAppointment.service";
import { NotificationGateway } from "./notification.gateway";

@Module({
  providers: [NotificationGateway, DriverService, DriverToAppointmentService],
  exports: [NotificationGateway],
})
export class NotificationModule {}
