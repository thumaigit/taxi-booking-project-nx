import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AppointmentModule } from "../appointment/appointment.module";
import { DriverModule } from "../driver/driver.module";
import { GoongModule } from "../goong/goong.module";
import { NotificationModule } from "../notification/notification.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserJwtStrategy } from "./jwt.strategy";
import { TwilioModule } from 'nestjs-twilio';

@Module({
  imports: [
    NotificationModule,
    DriverModule,
    AppointmentModule,
    GoongModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_CONSTANTS_SECRET,
      signOptions: { expiresIn: "3000s" },
    }),
    TwilioModule.forRoot({
      accountSid: process.env.TWILIO_ACCOUNT_SID,
      authToken: process.env.TWILIO_AUTH_TOKEN,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, UserJwtStrategy],
  exports: [AppService],
})
export class AppModule {}
