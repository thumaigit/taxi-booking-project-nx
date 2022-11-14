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
      by: ["endPoint"],
      orderBy: {
        _count: {
          endPoint: "desc",
        },
      },
      take: 5,
    });

    return {
      basic_info: {
        user_id: client?.id,
        full_name: client?.full_name,
        phone_number: client?.phone_number,
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

  async sendSMS(data) {
    const { clientPhone, driverAssigned } = data;

    const body = `Tai xe dang den don ban.
    Tai xe: ${driverAssigned.name},
    So dien thoai: ${driverAssigned.phone}
    Bien so: ${driverAssigned.carLicense},
    Loai xe: ${driverAssigned.carName} - ${driverAssigned.carType}`;

    console.log(body);
    return this.twilioService.client.messages.create({
      body: body,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: `+84${+clientPhone}`,
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

  async retrieveCallInfo(dto) {
    const phoneNumber = dto.From.replace("+84", "0");
    this.socketClient.emit("NEW_INCOMING_CALL", phoneNumber);
    return dto;
  }
}
