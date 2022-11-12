import { WebsocketContext } from "@@contexts/WebsocketContext";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";

const Dashboard = () => {
  const socket = useContext(WebsocketContext);
  const appointmentInit = {
    id: "678",
    name: "Mai Thị Hằng Thư",
    phone: "0987654321",
    startPoint:
      "FPT Software Ho Chi Minh - F-Town 3, Long Thạnh Mỹ, Quận 9, Thành phố Hồ Chí Minh",
    startLocation: {
      lat: 10.8362668,
      lng: 106.8083887,
    },
    endPoint:
      "Vincom Landmark 81, 720A Điện Biên Phủ, Phường 22, Bình Thạnh, Thành phố Hồ Chí Minh",
  };
  const [drivers, setDrivers] = useState([]);
  const [driverAccept, setDriverAccept] = useState(null);

  const [form, setValues] = useState({
    phone: "",
    name: "",
    startPoint: "",
    endPoint: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();
    socket.emit("NEW_APPOINTMENT", { ...appointmentInit });
  };

  const updateField = (e) => {
    setValues({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    socket.on("acceptAppointment", (payload) => {
      const { driver } = payload;
      setDriverAccept(driver);
    });

    return () => {
      socket.off("acceptAppointment");
    };
  }, []);

  useEffect(() => {
    if (driverAccept) {
      setDrivers([...drivers, driverAccept]);
    }
  }, [driverAccept]);

  useEffect(() => {
    console.log(drivers);
  }, [drivers]);

  return (
    <Box sx={{ display: "flex" }}>
      <Box sx={{ flex: 1, color: "#00155F" }}>
        <div className="card">
          <form>
            <Box
              sx={{
                flex: 1,
                display: "flex",
                fontFamily: "Montserrat",
                marginBottom: "10px",
                flexDirection: "column",
                color: "#555",
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Montserrat",
                  fontWeight: 500,
                  marginRight: "10px",
                  fontSize: "15px",
                  marginBottom: "5px",
                }}
              >
                Số điện thoại:{" "}
              </Typography>
              <TextField
                size="small"
                sx={{ flex: 1, fontFamily: "Montserrat", fontWeight: 500 }}
                value={form.phone}
                type="text"
                name="phone"
                onChange={updateField}
                inputProps={{
                  style: {
                    padding: "5px 10px",
                  },
                }}
                required
              />
            </Box>
            <Box
              sx={{
                flex: 1,
                display: "flex",
                fontFamily: "Montserrat",
                marginBottom: "10px",
                flexDirection: "column",
                color: "#555",
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Montserrat",
                  fontWeight: 500,
                  marginRight: "10px",
                  fontSize: "15px",
                  marginBottom: "5px",
                }}
              >
                Tên khách hàng:{" "}
              </Typography>
              <TextField
                size="small"
                sx={{ flex: 1, fontFamily: "Montserrat", fontWeight: 500 }}
                value={form.name}
                type="text"
                name="name"
                onChange={updateField}
                inputProps={{
                  style: {
                    padding: "5px 10px",
                  },
                }}
                required
              />
            </Box>
            <Box
              sx={{
                flex: 1,
                display: "flex",
                fontFamily: "Montserrat",
                marginBottom: "10px",
                flexDirection: "column",
                color: "#555",
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Montserrat",
                  fontWeight: 500,
                  marginRight: "10px",
                  fontSize: "15px",
                  marginBottom: "5px",
                }}
              >
                Địa điểm đón khách:{" "}
              </Typography>
              <TextField
                size="small"
                sx={{ flex: 1, fontFamily: "Montserrat", fontWeight: 500 }}
                value={form.startPoint}
                type="text"
                name="startPoint"
                onChange={updateField}
                inputProps={{
                  style: {
                    padding: "5px 10px",
                  },
                }}
                required
              />
            </Box>
            <Box
              sx={{
                flex: 1,
                display: "flex",
                fontFamily: "Montserrat",
                marginBottom: "10px",
                flexDirection: "column",
                color: "#555",
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Montserrat",
                  fontWeight: 500,
                  marginRight: "10px",
                  fontSize: "15px",
                  marginBottom: "5px",
                }}
              >
                Địa điểm trả khách:{" "}
              </Typography>
              <TextField
                size="small"
                sx={{ flex: 1, fontFamily: "Montserrat", fontWeight: 500 }}
                value={form.endPoint}
                type="text"
                name="endPoint"
                onChange={updateField}
                inputProps={{
                  style: {
                    padding: "5px 10px",
                  },
                }}
                required
              />
            </Box>
            <Button onClick={onSubmit}>Tìm tài xế</Button>
          </form>
        </div>
      </Box>
      <Box sx={{ flex: 3 }}></Box>
    </Box>
  );
};

export default Dashboard;
