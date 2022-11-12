import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { DriverService } from "../driver/driver.service";

@WebSocketGateway({ cors: true })
export class NotificationGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  constructor(private driverService: DriverService) {}

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
    const { id, startLocation } = payload;
    driver.join(`appointment-${id}`);

    const drivers = await this.driverService.findDriverForAppointment(
      startLocation
    );

    drivers.forEach((value) => {
      const { id, direction } = value;
      driver.join(`driver-${id}`);
      driver.broadcast
        .to(`driver-${id}`)
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
    const appointmentId = payload.appointment.id
    console.log(payload)
    driver.join(`appointment-${appointmentId}`);
    driver.broadcast
      .to(`appointment-${appointmentId}`)
      .emit("acceptAppointment", { ...payload, action: "ACCEPTED" });
  }

  @SubscribeMessage("REJECT_APPOINTMENT")
  async handleReject(driver: Socket, payload) {
    const room_id = payload.room_id;
    driver.join(room_id);
    driver.broadcast
      .to(room_id)
      .emit("rejectAppointment", { payload, action: "REJECTED" });
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
