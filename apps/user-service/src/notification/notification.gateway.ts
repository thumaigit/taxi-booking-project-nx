import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { DriverService } from "../driver/driver.service";
import { DriverToAppointmentService } from "../driverToAppointment/driverToAppointment.service";

@WebSocketGateway({ cors: true })
export class NotificationGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  constructor(
    private driverService: DriverService,
    private driverToAppointmentService: DriverToAppointmentService
  ) {}

  async handleConnection(socket: Socket) {
    console.log("Connected");
  }

  async handleDisconnect(socket: Socket) {
    console.log("Disconnected");
    socket.disconnect();
  }
  // Dispatcher action
  @SubscribeMessage("JOIN_ROOM")
  async handJoinRoom(driver: Socket, payload) {
    const room_id = "car:567";
    driver.join(room_id);
    console.log(driver.rooms);
  }

  // Dispatcher action
  @SubscribeMessage("NEW_APPOINTMENT")
  async newAppointment(driver: Socket, payload) {
    const { id: appointmentId, startPoint } = payload;
    driver.join(`appointment-${appointmentId}`);

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
      driver.broadcast
        .to(`driver-${driverId}`)
        .emit("newAppointment", { ...payload, direction });
    });
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

    console.log(payload);
    driver.join(`appointment-${appointmentId}`);
    driver.broadcast
      .to(`appointment-${appointmentId}`)
      .emit("acceptAppointment", { ...payload, action: "ACCEPTED" });
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
}
