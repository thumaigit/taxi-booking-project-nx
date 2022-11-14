import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

import { DispatcherService } from "./dispatcher.service";

@Controller()
export class DispatcherController {
  constructor(private readonly dispatcherService: DispatcherService) {}

  @Get(":phone_number/login")
  getLoginUserByPhoneNumber(@Param("phone_number") phone_number: string) {
    const res = this.dispatcherService.findLoginDispatcher(phone_number);
    return res;
  }

  @Post("user")
  createUser(@Body() dto: any) {
    return this.dispatcherService.createDispatcher(dto);
  }

  // @UseGuards(AuthGuard("jwt"))
  @Get(":phone_number/ride")
  getRideByPhoneNumber(@Param("phone_number") phone_number: string) {
    const res = this.dispatcherService.getClientRide(phone_number);
    return res;
  }

  @UseGuards(AuthGuard("jwt"))
  @Get(":phone_number/user")
  getUserByPhoneNumber(@Param("phone_number") phone_number: string) {
    const res = this.dispatcherService.findDispatcher(phone_number);
    return res;
  }

  @UseGuards(AuthGuard("jwt"))
  @Post(":customer_phone/sms")
  sentSmsCustomer(@Body() dto: any) {
    const result = this.dispatcherService.sendSMS(dto);
    return result;
  }

  @Get(":customer_phone/call")
  callCustomer(@Param("customer_phone") customer_phone: string): Promise<any> {
    const result = this.dispatcherService.callCustomer(customer_phone);
    return result;
  }

  @Post("incoming-call")
  retrieveCallInfo(@Body() dto: any) {
    const result = this.dispatcherService.retrieveCallInfo(dto);
    return result;
  }
}
