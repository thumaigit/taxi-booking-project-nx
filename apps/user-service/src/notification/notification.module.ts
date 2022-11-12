import { Module } from "@nestjs/common";
import { DriverService } from "../driver/driver.service";
import { NotificationGateway } from "./notification.gateway";

@Module({
  providers: [NotificationGateway, DriverService],
  exports: [NotificationGateway],
})
export class NotificationModule {}
