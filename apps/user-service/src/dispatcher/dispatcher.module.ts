import { Module } from "@nestjs/common";
import { TwilioModule } from "nestjs-twilio";
import { DispatcherController } from "./dispatcher.controller";
import { DispatcherService } from "./dispatcher.service";

@Module({
  imports: [
    TwilioModule.forRoot({
      accountSid: process.env.TWILIO_ACCOUNT_SID,
      authToken: process.env.TWILIO_AUTH_TOKEN,
    }),
  ],
  controllers: [DispatcherController],
  providers: [DispatcherService],
})
export class DispatcherModule {}
