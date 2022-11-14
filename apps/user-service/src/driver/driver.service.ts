import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { createError } from "../errors/errors";
import { GoongService } from "../goong/goong.service";
import { signInDto } from "./dto/signIn.dto";
import { updateDriverDto } from "./dto/updateDriver.dto";

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
      throw createError('Driver', error);
    }
  }

  async findById(param) {
    try {
      return await prisma.driver.findFirstOrThrow({
        where: {
          id: param.id,
        },
      });
    } catch (error) {
      throw createError('Driver', error);
    }
  }

  async findDriverForAppointment(clientAddress: string) {
    try {
      const drivers = await prisma.driver.findMany({
        where: {
          status: "ONLINE",
        },
      });

      const response = drivers.map(async (driver) => {
        const clientLocation = await this.goongService.getLocation(
          clientAddress
        );

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
              distance: direction.distance,
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
      throw createError('Driver', error);
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
      throw createError('Driver', error);
    }
  }

  async updateDriver(param, data: updateDriverDto) {
    try {
      const driver = await prisma.driver.update({
        where: {
          id: param.id,
        },
        data,
      });

      delete driver.password;
      return driver;
    } catch (error) {
      throw createError('Driver', error);
    }
  }
}
