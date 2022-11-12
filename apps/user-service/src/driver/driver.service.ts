import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { GoongService } from "../goong/goong.service";
import { createDriverDto } from "./dto/createDriver.dto";
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

  async findDriverForAppointment(clientLocation) {
    try {
      const drivers = await prisma.driver.findMany({
        where: {
          status: "ONLINE",
        },
      });

      const response = drivers.map(async (driver) => {
        const driverLocation = await this.goongService.getLocation(
          driver.currentAddress
        );

        const direction = await this.goongService.getDistance(
          clientLocation,
          driverLocation
        );

        if (direction.distance.value < 2000) {
          return driver.id;
        } 
        return
      });

      return Promise.all(response);
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
