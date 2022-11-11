import { WebsocketContext } from "@@contexts/WebsocketContext";
import React, { useContext, useEffect, useState } from "react";

const Dashboard = () => {
  const socket = useContext(WebsocketContext);
  const [appointment, setAppointment] = useState(null);

  useEffect(() => {
    socket.on("newAppointment", (message) => {
      console.log(message);
      setAppointment(message.payload);
    });

    socket.on("acceptAppointment", (payload) => {
      console.log(payload);
    });

    return () => {
      socket.off("newAppointment");
      socket.off("acceptAppointment");
    };
  }, []);

  const onAccept = () => {
    socket.emit("ACCEPT_APPOINTMENT", {
      room_id: "car:567",
      driver: {
        name: "Thu Mai",
        carType: "7 chỗ",
        address: "3 Võ Chí Công - TP. Thủ Đức",
      },
    });
  };

  const onReject = () => {
    socket.emit("REJECT_APPOINTMENT", {
      room_id: "car:567",
      driver: {
        name: "Thu Mai",
        carType: "7 chỗ",
        address: "3 Võ Chí Công - TP. Thủ Đức",
      },
    });
  };

  return (
    <div>
      <p>Weo come to Driver App</p>
      <p>Có chuyến đi đang chờ bạn</p>
      <p>Số điện thoại: {appointment?.phone}</p>
      <p>Tên khách hàng: {appointment?.name}</p>
      <p>Địa điểm đón: {appointment?.startAddress}</p>
      <p>Địa đểm trả: {appointment?.endAddress}</p>
      <button onClick={onAccept}>Accept</button>
      <button onClick={onReject}>Reject</button>
    </div>
  );
};

export default Dashboard;
