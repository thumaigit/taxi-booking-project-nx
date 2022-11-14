import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { createError } from "../errors/errors";

const prisma = new PrismaClient();

interface DriverToAppointmentCreate {
  appointmentId: number;
  driverId: string;
  action?: string;
  direction: string;
}

@Injectable()
export class DriverToAppointmentService {
  async findByAppointmentId(appointmentId: number) {
    try {
      return prisma.driverToAppointment.findMany({
        where: {
          appointmentId,
        },
        include: {
          appointment: true,
          driver: true,
        },
      });
    } catch (error) {
      throw createError("DriverToAppointment", error);
    }
  }

  async findAcceptedDrivers(appointmentId: number) {
    try {
      const response = await prisma.driverToAppointment.findMany({
        where: {
          appointmentId,
          action: "ACCEPTED",
        },
        include: {
          appointment: true,
          driver: true,
        },
      });

      return Promise.all(response);
    } catch (error) {
      throw createError("DriverToAppointment", error);
    }
  }

  async create(data: DriverToAppointmentCreate) {
    try {
      return prisma.driverToAppointment.create({
        data,
      });
      return;
    } catch (error) {
      throw createError("DriverToAppointment", error);
    }
  }

  async updateByInfo(data) {
    try {
      return await prisma.driverToAppointment.update({
        where: {
          appointmentId_driverId: {
            appointmentId: data.appointmentId,
            driverId: data.driverId,
          },
        },
        data: {
          action: data.action,
        },
      });
    } catch (error) {
      throw createError("DriverToAppointment", error);
    }
  }

  async delete(id) {
    try {
      return await prisma.driverToAppointment.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      throw createError("DriverToAppointment", error);
    }
  }
}
