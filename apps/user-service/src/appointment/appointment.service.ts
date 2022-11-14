import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { retry } from "rxjs";
import { GoongService } from "../goong/goong.service";
import { updateAppointmentDto } from "./dto/updateAppointment.dto";

const prisma = new PrismaClient();

@Injectable()
export class AppointmentService {
  constructor(private readonly goongService: GoongService) {}

  async findAll() {
    try {
      return await prisma.appointment.findMany({
        orderBy: {
          id: "desc",
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async findByPhone(query) {
    const { phone: clientPhone, limit: take, offset: skip = 0 } = query;
    try {
      return await prisma.appointment.findMany({
        where: {
          clientPhone,
        },
        take,
        skip,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async findById(id: number) {
    try {
      return await prisma.appointment.findFirstOrThrow({
        where: {
          id,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async createAppointment(dto) {
    const { carType, ...data } = dto;
    try {
      const appointment = await prisma.appointment.create({
        data,
      });

      return appointment;
    } catch (error) {
      console.log(error);
    }
  }

  async updateAppointment(id: number, data: updateAppointmentDto) {
    try {
      const appointment = await prisma.appointment.update({
        where: {
          id: +id,
        },
        data: {
          ...data,
        },
      });

      return appointment;
    } catch (error) {
      console.log(error);
    }
  }
}
