import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

@Injectable()
export class DriverOnlineService {
  async getAllDriver() {
    const drivers = await prisma.driverOnline.findMany({
      where: {
        status: "READY",
      },
    });
    return drivers;
  }

  async getDriverById(driver_id: string) {
    const drivers = await prisma.driverOnline.findFirstOrThrow({
      where: {
        driver_id,
      },
    });
    return drivers;
  }

  async addDriver(data) {
    const drivers = await prisma.driverOnline.create({
      data,
    });
    return drivers;
  }

  async updateDriver(dto) {
    const { driver_id, ...data } = dto;
    const drivers = await prisma.driverOnline.update({
      where: {
        driver_id,
      },
      data,
    });
    return drivers;
  }

  async removeDriver(driver_id) {
    const drivers = await prisma.driverOnline.delete({
      where: {
        driver_id,
      },
    });
    return drivers;
  }
}
