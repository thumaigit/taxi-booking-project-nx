import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { NotificationModule } from "../notification/notification.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserJwtStrategy } from "./jwt.strategy";

@Module({
  imports: [
    NotificationModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_CONSTANTS_SECRET,
      signOptions: { expiresIn: "3000s" },
    }),
  ],
  controllers: [AppController],
  providers: [AppService, UserJwtStrategy],
  exports: [AppService],
})
export class AppModule {}
