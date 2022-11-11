import { Module } from "@nestjs/common";
import { DriverOnlineService } from "./driverOnline/driverOnline.service";
import { NotificationGateway } from "./notification.gateway";

@Module({
  providers: [NotificationGateway, DriverOnlineService],
  exports: [NotificationGateway],
})
export class NotificationModule {}
