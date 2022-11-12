import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { GoongService } from "../goong/goong.service";
import { signInDto } from "./dto/signIn.dto";

const prisma = new PrismaClient();

@Injectable()
export class DriverService {
  constructor(private readonly goongService: GoongService) {}

  async signIn(dto: signInDto) {
    try {
      const driver = await prisma.driver.findFirstOrThrow({
        where: {
          phone: dto.phone,
          password: dto.password,
        },
      });

      delete driver.password;
      return driver;
    } catch (error) {
      console.log(error);
    }
  }

  async findDriverForAppointment(address: string) {
    try {
      const drivers = await prisma.driver.findMany({
        where: {
          status: "ONLINE",
        },
      });

      const response = drivers.map(async (driver) => {
        const clientLocation = await this.goongService.getLocation(address);

        const driverLocation = await this.goongService.getLocation(
          driver.currentAddress
        );

        const direction = await this.goongService.getDistance(
          clientLocation,
          driverLocation
        );

        if (direction.distance.value < 2000) {
          return {
            id: driver.id,
            direction: {
              distance: direction.direction,
              duration: direction.duration,
            },
          };
        }
        return;
      });

      return Promise.all(response).then((results) => {
        return results.filter((driver) => driver?.id != undefined);
      });
    } catch (error) {
      console.log(error);
    }
  }

  async createDriver(data) {
    try {
      const driver = await prisma.driver.create({
        data,
      });

      delete driver.password;
      return driver;
    } catch (error) {
      console.log(error);
    }
  }
}
