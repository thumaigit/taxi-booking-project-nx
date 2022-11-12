import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { createDriverDto } from "./dto/createDriver.dto";
import { signInDto } from "./dto/signIn.dto";

const prisma = new PrismaClient();

const enum Status {
  ONLINE = "ONLINE",
  OFFLINE = "OFFLINE",
}

@Injectable()
export class DriverService {
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
