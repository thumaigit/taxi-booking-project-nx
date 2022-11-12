import {
  Body,
  Controller,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { Stats } from "fs";
import { DriverService } from "./driver.service";
import { createDriverDto } from "./dto/createDriver.dto";
import { signInDto } from "./dto/signIn.dto";

@Controller("/driver")
@UsePipes(
  new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  })
)
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  @Post("/sign-in")
  @HttpCode(200)
  signIn(@Body() dto: signInDto) {
    return this.driverService.signIn(dto);
  }

  @Post("")
  createDriver(@Body() dto: createDriverDto) {
    return this.driverService.createDriver(dto);
  }
}
