import { Module } from "@nestjs/common";
import { TwilioModule } from "nestjs-twilio";
import { AppointmentService } from "../appointment/appointment.service";
import { DispatcherService } from "../dispatcher/dispatcher.service";
import { DriverService } from "../driver/driver.service";
import { DriverToAppointmentService } from "../driverToAppointment/driverToAppointment.service";
import { NotificationGateway } from "./notification.gateway";

@Module({
  imports: [
    TwilioModule.forRoot({
      accountSid: process.env.TWILIO_ACCOUNT_SID,
      authToken: process.env.TWILIO_AUTH_TOKEN,
    }),
  ],
  providers: [
    NotificationGateway,
    DriverService,
    DriverToAppointmentService,
    AppointmentService,
    DispatcherService,
  ],
  exports: [NotificationGateway],
})
export class NotificationModule {}
