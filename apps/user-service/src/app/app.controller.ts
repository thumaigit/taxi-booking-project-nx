import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Ride, User } from '@prisma/client';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':phone_number/login')
  getLoginUserByPhoneNumber(@Param('phone_number') phone_number: string) {
    const res = this.appService.findLoginUser(phone_number);
    return res;
  }

  @Post('user')
  createUser(@Body() dto: any) {
    return this.appService.createUser(dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':phone_number/ride')
  getRideByPhoneNumber(@Param('phone_number') phone_number: string) {
    const res = this.appService.getUser(phone_number);
    return res;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':phone_number/user')
  getUserByPhoneNumber(@Param('phone_number') phone_number: string) {
    const res = this.appService.findUser(phone_number);
    return res;
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('ride')
  createRide(@Body() dto: Ride) {
    return this.appService.createRides(dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':phone_number/:current_address/:status/:firebase_token/driver')
  updateDriverSucessLogin(
    @Param('phone_number') phone_number: string,
    @Param('current_address') current_address: string,
    @Param('status') status: string,
    @Param('firebase_token') firebase_token: string
  ) {
    const res = this.appService.updateOnlineDriverInfo(
      phone_number,
      current_address,
      status,
      firebase_token
    );
    return res;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':customer_address/assign')
  getAssignDriver(
    @Param('customer_address') customer_address: string
  ): Promise<any> {
    const drivers = this.appService.getAvailableDriver(customer_address);
    return drivers;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':customer_phone/sms')
  sentSmsCustomer(
    @Param('customer_phone') customer_phone: string
  ): Promise<any> {
    const result = this.appService.sendSMS(customer_phone);
    return result;
  }

  @Get(':customer_phone/call')
  callCustomer(@Param('customer_phone') customer_phone: string): Promise<any> {
    const result = this.appService.callCustomer(customer_phone);
    return result;
  }

  @Post('incoming-call')
  retrieveCallInfo(@Body() dto: any) {
    return this.appService.retrieveCallInfo(dto);
  }
}
