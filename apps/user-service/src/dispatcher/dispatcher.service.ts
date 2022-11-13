import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient, Ride, Dispatcher, Appointment, Client } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import Axios from 'axios';
import { TwilioService } from 'nestjs-twilio';

const prisma = new PrismaClient();
const goongKey = '0zKkBcMbQKAkWsB23qQAeFiGPQN4uQ1tsMeN0ZdG';
const goong = 'https://rsapi.goong.io';

const enum Status {
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE',
}

const enum UserType {
  CUSTOMER = 'customer',
  DRIVER = 'driver',
  ADMIN = 'admin',
}

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

export type CreateUserResponse = Omit<Dispatcher, 'user_password'>;

@Injectable()
export class DispatcherService {
  public constructor(private readonly twilioService: TwilioService) {}

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
      by: ['endLocation'],
      orderBy: {
        _count: {
          endLocation: 'desc',
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

  async createRides(dto: Ride): Promise<Ride> {
    try {
      const ride = await prisma.ride.create({
        data: dto,
      });
      return ride;
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        // The .code property can be accessed in a type-safe manner
        if (e.code === 'P2002') {
          console.log(
            'There is a unique constraint violation, a new ride cannot be created with this user'
          );
        }
      }
      throw e;
    }
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
      body: 'SMS Body, sent to the phone!',
      from: process.env.TWILIO_PHONE_NUMBER,
      to: customer_phone,
    });
  }

  async callCustomer(customer_phone: string) {
    return this.twilioService.client.calls
      .create({
        url: 'http://demo.twilio.com/docs/voice.xml',
        to: customer_phone,
        from: process.env.TWILIO_PHONE_NUMBER,
      })
      .then((call) => console.log(call.sid));
  }

  async retrieveCallInfo(dto: any) {
    return dto.data;
  }
}
