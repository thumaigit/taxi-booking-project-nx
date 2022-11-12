import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { retry } from "rxjs";
import { GoongService } from "../goong/goong.service";
import { updateAppointmentDto } from "./dto/updateAppointment.dto";

const prisma = new PrismaClient();

@Injectable()
export class AppointmentService {
  constructor(private readonly goongService: GoongService) {}

  async findByPhone(clientPhone: string) {
    try {
      return await prisma.appointment.findMany({
        where: {
          clientPhone,
        },
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

  async createAppointment(data) {
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
        data,
      });

      return appointment;
    } catch (error) {
      console.log(error);
    }
  }
}
