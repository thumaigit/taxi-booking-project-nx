import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AppointmentModule } from "../appointment/appointment.module";
import { DriverModule } from "../driver/driver.module";
import { GoongModule } from "../goong/goong.module";
import { NotificationModule } from "../notification/notification.module";
import { UserJwtStrategy } from "./jwt.strategy";
import { DriverToAppointmentModule } from "../driverToAppointment/driverToAppointment.module";
import { DispatcherModule } from "../dispatcher/dispatcher.module";

@Module({
  imports: [
    DispatcherModule,
    NotificationModule,
    DriverModule,
    AppointmentModule,
    DriverToAppointmentModule,
    GoongModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_CONSTANTS_SECRET,
      signOptions: { expiresIn: "3000s" },
    }),
  ],
  controllers: [],
  providers: [UserJwtStrategy],
  exports: [],
})
export class AppModule {}
