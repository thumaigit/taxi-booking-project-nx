import { Injectable } from "@nestjs/common";
import { Appointment, Dispatcher, PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { TwilioService } from "nestjs-twilio";
import { io, Socket } from "socket.io-client";

const prisma = new PrismaClient();

export type CallUser = {
  basic_info: {
    user_id: number;
    full_name: string;
    phone_number: string;
  };
  ride_history: Appointment[];
  frequently_address: object[];
};

export type LoginUserResponse = {
  phone_number: string;
  user_password: string;
};

export type CreateUserResponse = Omit<Dispatcher, "user_password">;

@Injectable()
export class DispatcherService {
  private socketClient: Socket;

  public constructor(private readonly twilioService: TwilioService) {
    this.socketClient = io("http://localhost:3000");
  }

  async getClientRide(phoneNumber: string): Promise<CallUser> {
    const client = await prisma.client.findUnique({
      where: {
        phone_number: phoneNumber,
      },
    });

    const rides = await prisma.appointment.findMany({
      where: {
        clientPhone: phoneNumber,
      },
    });

    const clientFrequentlyAddress = await prisma.appointment.groupBy({
      where: {
        clientPhone: phoneNumber,
      },
      by: ["endLocation"],
      orderBy: {
        _count: {
          endLocation: "desc",
        },
      },
      take: 5,
    });

    return {
      basic_info: {
        user_id: client.id,
        full_name: client.full_name,
        phone_number: client.phone_number,
      },
      ride_history: rides,
      frequently_address: clientFrequentlyAddress,
    };
  }

  async findDispatcher(phoneNumber: string): Promise<Dispatcher> {
    const dispatcher = await prisma.dispatcher.findUnique({
      where: {
        phone_number: phoneNumber,
      },
    });
    return dispatcher;
  }

  async findLoginDispatcher(phoneNumber: string): Promise<LoginUserResponse> {
    const user = await prisma.dispatcher.findUnique({
      where: {
        phone_number: phoneNumber,
      },
    });
    const loginUser = {
      phone_number: user.phone_number,
      user_password: user.user_password,
    };
    return loginUser;
  }

  async createDispatcher(dto: any): Promise<CreateUserResponse> {
    const saltOrRounds = 10;
    const password = dto.user_password;
    const hash = await bcrypt.hash(password, saltOrRounds);

    const user = await prisma.dispatcher.create({
      data: {
        ...dto,
        user_password: hash,
      },
    });
    return user;
  }

  async sendSMS(customer_phone: string) {
    return this.twilioService.client.messages.create({
      body: "SMS Body, sent to the phone!",
      from: process.env.TWILIO_PHONE_NUMBER,
      to: customer_phone,
    });
  }

  async callCustomer(customer_phone: string) {
    return this.twilioService.client.calls
      .create({
        url: "http://demo.twilio.com/docs/voice.xml",
        to: customer_phone,
        from: process.env.TWILIO_PHONE_NUMBER,
      })
      .then((call) => console.log(call.sid));
  }

  async retrieveCallInfo(dto: any) {
    const data = {
      AccountSid: "ACbce9dc2ef19cb8c345e8fb119e0a87e6",
      ApiVersion: "2010-04-01",
      CallSid: "CA4f99721741fa0eb2aaedac611d5d9ae5",
      CallStatus: "ringing",
      CallToken:
        "%7B%22parentCallInfoToken%22%3A%22eyJhbGciOiJFUzI1NiJ9.eyJjYWxsU2lkIjoiQ0E0Zjk5NzIxNzQxZmEwZWIyYWFlZGFjNjExZDVkOWFlNSIsImZyb20iOiIrODQ5MTkzOTYxNTgiLCJ0byI6IisxNjE1NzA5OTgzNSIsImlhdCI6IjE2NjgzNTY1NDEifQ.dZvLjGSgII9uajKHMyuN7ZiBcewa3GN37OW-JD3tcC0rMGFlTPUQdqLWNSF6mmqk7oEa-YB-tnuC-e6ZRidyiw%22%2C%22identityHeaderTokens%22%3A%5B%22eyJhbGciOiJFUzI1NiIsInBwdCI6InNoYWtlbiIsInR5cCI6InBhc3Nwb3J0IiwieDV1IjoiaHR0cHM6Ly9jci5jY2lkLm5ldXN0YXIuYml6L2NjaWQvYXV0aG4vdjIvY2VydHMvMTEwMDEuMTAwMTIifQ.eyJhdHRlc3QiOiJDIiwiZGVzdCI6eyJ0biI6WyIxNjE1NzA5OTgzNSJdfSwiaWF0IjoxNjY4MzU2NTQxLCJvcmlnIjp7InRuIjoiODQ5MTkzOTYxNTgifSwib3JpZ2lkIjoiYWIyZjkzZDctOWQ3Yi00OWQ0LWIyZDctMDIzYzc4OWMwZDRjIn0.J5-lprMs9p-2Ijw9aHOnRsEdirPcv8O177TDzHw5xnsK5ArM8ThxaC2JzmIMZsdeqxeRygqj9iTu-QihdEIkeA%3Binfo%3D%3Chttps%3A%2F%2Fcr.ccid.neustar.biz%2Fccid%2Fauthn%2Fv2%2Fcerts%2F11001.10012%3E%3Balg%3DES256%3Bppt%3D%5C%22shaken%5C%22%22%5D%7D",
      Called: "+16157099835",
      CalledCity: "",
      CalledCountry: "US",
      CalledState: "TN",
      CalledZip: "",
      Caller: "+84919396158",
      CallerCity: "",
      CallerCountry: "VN",
      CallerState: "",
      CallerZip: "",
      Direction: "inbound",
      From: "+84919396158",
      FromCity: "",
      FromCountry: "VN",
      FromState: "",
      FromZip: "",
      StirPassportToken:
        "eyJhbGciOiJFUzI1NiIsInBwdCI6InNoYWtlbiIsInR5cCI6InBhc3Nwb3J0IiwieDV1IjoiaHR0cHM6Ly9jci5jY2lkLm5ldXN0YXIuYml6L2NjaWQvYXV0aG4vdjIvY2VydHMvMTEwMDEuMTAwMTIifQ.eyJhdHRlc3QiOiJDIiwiZGVzdCI6eyJ0biI6WyIxNjE1NzA5OTgzNSJdfSwiaWF0IjoxNjY4MzU2NTQxLCJvcmlnIjp7InRuIjoiODQ5MTkzOTYxNTgifSwib3JpZ2lkIjoiYWIyZjkzZDctOWQ3Yi00OWQ0LWIyZDctMDIzYzc4OWMwZDRjIn0.J5-lprMs9p-2Ijw9aHOnRsEdirPcv8O177TDzHw5xnsK5ArM8ThxaC2JzmIMZsdeqxeRygqj9iTu-QihdEIkeA",
      StirVerstat: "TN-Validation-Passed-C",
      To: "+16157099835",
      ToCity: "",
      ToCountry: "US",
      ToState: "TN",
      ToZip: "",
    };
    const phoneNumber = data.From.replace("+84", "0");
    this.socketClient.emit("NEW_INCOMING_CALL", '0987654321');
    return data;
  }
}
