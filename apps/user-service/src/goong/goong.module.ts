import { Global, Module } from "@nestjs/common";
import { GoongService } from "./goong.service";

@Global()
@Module({
  providers: [GoongService],
  exports: [GoongService],
})
export class GoongModule {}
