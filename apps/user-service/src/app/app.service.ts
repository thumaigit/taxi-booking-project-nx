import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient, Ride, User } from '@prisma/client';
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
    user_id: string;
    full_name: string;
    phone_number: string;
  };
  ride_history: Ride[];
  frequently_address: object[];
};

export type LoginUserResponse = {
  phone_number: string;
  user_password: string;
};

export type CreateUserResponse = Omit<User, 'user_password'>;

@Injectable()
export class AppService {
  public constructor(private readonly twilioService: TwilioService) {}

  async getUser(phoneNumber: string): Promise<CallUser> {
    const user = await prisma.user.findUnique({
      where: {
        phone_number: phoneNumber,
      },
      include: {
        ride_history: {
          orderBy: {
            created_at: 'desc',
          },
          take: 5,
        },
      },
    });

    const userFrequentlyAddress = await prisma.ride.groupBy({
      where: {
        user: {
          phone_number: phoneNumber,
        },
      },
      by: ['arrive_address'],
      orderBy: {
        _count: {
          arrive_address: 'desc',
        },
      },
      take: 5,
    });

    return {
      basic_info: {
        user_id: user.id,
        full_name: user.full_name,
        phone_number: user.phone_number,
      },
      ride_history: user.ride_history,
      frequently_address: userFrequentlyAddress,
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

  async findUser(phoneNumber: string): Promise<User> {
    const user = await prisma.user.findUnique({
      where: {
        phone_number: phoneNumber,
      },
    });
    return user;
  }

  async findLoginUser(phoneNumber: string): Promise<LoginUserResponse> {
    const user = await prisma.user.findUnique({
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

  async createUser(dto: any): Promise<CreateUserResponse> {
    const saltOrRounds = 10;
    const password = dto.user_password;
    const hash = await bcrypt.hash(password, saltOrRounds);

    const user = await prisma.user.create({
      data: {
        ...dto,
        user_password: hash,
      },
    });
    return user;
  }

  async updateOnlineDriverInfo(
    username: string,
    currentAddress: string,
    status: string,
    firebaseToken: string
  ): Promise<any> {
    if (status == Status.ONLINE) {
      const driver = await prisma.user.update({
        where: {
          phone_number: username,
        },
        data: {
          status: Status.ONLINE,
          current_address: currentAddress,
          firebase_token: firebaseToken,
        },
      });
      return {
        status: driver.status,
        address: driver.current_address,
      };
    } else if (status == Status.OFFLINE) {
      const driver = await prisma.user.update({
        where: {
          phone_number: username,
        },
        data: {
          status: Status.OFFLINE,
        },
      });
      return { status: driver.status };
    }
    return null;
  }

  async getLocation(address: string): Promise<any> {
    const url = `${goong}/geocode?address=${address}&api_key=${goongKey}`;
    try {
      const geoCoding = await Axios.get(url);
      const location = geoCoding.data.results[0].geometry.location;
      return location;
    } catch (e) {
      console.error('getLocation error');
    }
  }

  async getDistance(firstLocation: any, secondLocation: any): Promise<any> {
    const url = `${goong}/Direction?origin=${firstLocation.lat},${firstLocation.lng}&destination=${secondLocation.lat},${secondLocation.lng}&vehicle=car&api_key=${goongKey}`;
    try {
      const direction = await Axios.get(url);
      const distance = direction.data.routes[0].legs[0].distance.value;
      return distance;
    } catch (error) {
      console.error('getDistance error');
    }
  }

  async getAvailableDriver(customer_address: string): Promise<any[]> {
    try {
      const customerLocation = await this.getLocation(customer_address);
      const onlineDriver = await prisma.user.findMany({
        where: {
          status: Status.ONLINE,
          user_type: UserType.DRIVER,
        },
      });
      const drivers = onlineDriver.map(async (driver) => {
        const driverLocation = await this.getLocation(driver.current_address);
        const distance = await this.getDistance(
          customerLocation,
          driverLocation
        );
        if ((await distance) < 2000) {
          return {
            id: driver.id,
            driver_firebase_token: driver.firebase_token,
            phone_number: driver.phone_number,
            full_name: driver.full_name,
            distance: distance,
          };
        }
      });
      return Promise.all(drivers).then((results) => {
        return results.filter((drivers) => drivers != null);
      });
    } catch (error) {
      console.error('getAvailableDriver error');
    }
  }

  async sendSMS(customer_phone: string) {
    return this.twilioService.client.messages.create({
      body: 'SMS Body, sent to the phone!',
      from: process.env.TWILIO_PHONE_NUMBER,
      to: customer_phone,
    });
  }

  async callCustomer(customer_phone: string) {
    return this.twilioService.client.calls.create({
      url: 'http://demo.twilio.com/docs/voice.xml',
      to: customer_phone,
      from: process.env.TWILIO_PHONE_NUMBER,
    })
    .then(call => console.log(call.sid));
  }

  async retrieveCallInfo(dto: any) {
    return dto.data;
  }
}
