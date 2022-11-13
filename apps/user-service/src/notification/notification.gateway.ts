import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from "@nestjs/websockets";
import { DriverToAppointment } from "@prisma/client";
import { Server, Socket } from "socket.io";
import { AppointmentService } from "../appointment/appointment.service";
import { DriverService } from "../driver/driver.service";
import { DriverToAppointmentService } from "../driverToAppointment/driverToAppointment.service";

@WebSocketGateway({ cors: true })
export class NotificationGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  constructor(
    private driverService: DriverService,
    private appointmentService: AppointmentService,
    private driverToAppointmentService: DriverToAppointmentService
  ) {}

  async handleConnection(socket: Socket) {
    socket.join("publicMessages");
  }

  async handleDisconnect(socket: Socket) {
    console.log("Disconnected");
    socket.disconnect();
  }

  async handleAssign(drivers: DriverToAppointment[]) {
    if (drivers.length < 1) {
      return;
    }

    const distances = drivers.map((driver) => {
      const direction = JSON.parse(driver.direction);

      return direction.distance.value;
    });

    // eslint-disable-next-line prefer-spread
    const minDistance = Math.min.apply(Math, distances);
    const driverMinDistance = drivers.find((driver) => {
      const direction = JSON.parse(driver.direction);

      return direction.distance.value === minDistance;
    });

    const appointmentId = drivers[0].appointmentId;

    return await this.appointmentService.updateAppointment(appointmentId, {
      driverId: driverMinDistance.driverId,
    });
  }

  // Dispatcher action
  @SubscribeMessage("NEW_APPOINTMENT")
  async newAppointment(driver: Socket, payload) {
    const { id: appointmentId, startPoint } = payload;
    driver.to("publicMessages").emit("newMessage", {
      title: "NEW_APPOINTMENT",
      value: appointmentId,
    });
    const drivers = await this.driverService.findDriverForAppointment(
      startPoint
    );

    drivers.forEach((value) => {
      const { id: driverId, direction } = value;
      this.driverToAppointmentService.create({
        appointmentId,
        driverId,
        direction: JSON.stringify(direction),
      });
      driver.join(`driver-${driverId}`);
      driver
        .to(`driver-${driverId}`)
        .emit("newAppointment", { ...payload, direction });
    });

    // Affter 1 mins then auto assign for driver
    const timer = setTimeout(async () => {
      const acceptedDrivers =
        await this.driverToAppointmentService.findAcceptedDrivers(
          appointmentId
        );

      const result = await this.handleAssign(acceptedDrivers);
      driver.to("publicMessages").emit("newMessage", {
        title: "ASSIGN_APPOINTMENT",
        value: appointmentId,
      });

      driver
        .to(`appointment-${appointmentId}`)
        .emit("assignAppointment", result);
      clearTimeout(timer);
    }, 10000);
  }

  @SubscribeMessage("ASSIGN_APPOINTMENT")
  async assignAppointment(driver: Socket, payload) {
    const room_id = "car:567";
    driver.join(room_id);
    driver.broadcast.emit("assignAppointment", { payload, room_id: room_id });
  }

  // Driver action
  @SubscribeMessage("ACCEPT_APPOINTMENT")
  async handleAccept(driver: Socket, payload) {
    const appointmentId = payload.appointment.id;
    const driverId = payload.driver.id;

    this.driverToAppointmentService.updateByInfo({
      appointmentId,
      driverId,
      action: "ACCEPTED",
    });

    driver.join(`appointment-${appointmentId}`);
    driver.broadcast
      .to(`appointment-${appointmentId}`)
      .emit("acceptAppointment", { ...payload, action: "ACCEPTED" });

    driver.to("publicMessages").emit("newMessage", {
      title: "ACCEPT_APPOINTMENT",
      value: appointmentId,
    });
  }

  @SubscribeMessage("REJECT_APPOINTMENT")
  async handleReject(driver: Socket, payload) {
    const appointmentId = payload.appointment.id;
    const driverId = payload.driver.id;

    this.driverToAppointmentService.updateByInfo({
      appointmentId,
      driverId,
      action: "REJECTED",
    });

    driver.join(`appointment-${appointmentId}`);
    driver.broadcast
      .to(`appointment-${appointmentId}`)
      .emit("rejectAppointment", { ...payload, action: "REJECTED" });

    driver.to("publicMessages").emit("newMessage", {
      title: "REJECT_APPOINTMENT",
      value: appointmentId,
    });
  }

  @SubscribeMessage("CANCEL_APPOINTMENT")
  async handleCancel(driver: Socket, payload) {
    driver.broadcast.emit("cancelAppointment", { payload, action: "CANCELED" });
  }

  @SubscribeMessage("DRIVER_READY")
  async handleReady(driver: Socket, payload) {
    driver.join(`driver-${payload.id}`);
    driver.join("driversReady");
    driver.emit("driversReady", { payload });
  }

  @SubscribeMessage("DRIVER_BUSY")
  async handleBusy(driver: Socket, payload) {
    driver.join("driverBusy");
    driver.emit("driverBusy", { payload });
  }

  @SubscribeMessage("DRIVER_OFFLINE")
  async handleOffline(driver: Socket) {
    driver.disconnect();
  }

  // TWILLO
  @SubscribeMessage("NEW_INCOMING_CALL")
  async handleNewIncomingCall(driver: Socket, phoneNumber: string) {
    driver.to("publicMessages").emit("newIncomingCall", phoneNumber);
  }
}
