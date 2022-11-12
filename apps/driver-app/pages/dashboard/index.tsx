import { WebsocketContext } from "@@contexts/WebsocketContext";
import { AppState } from "@@store/store";
import AdjustIcon from "@mui/icons-material/Adjust";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import MenuIcon from "@mui/icons-material/Menu";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import ToysOutlinedIcon from "@mui/icons-material/ToysOutlined";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import { Box, Button, Typography } from "@mui/material";
import Switch from "@mui/material/Switch";
import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const appointmentInit = {
    id: "678",
    name: "Mai Thị Hằng Thư",
    phone: "0987 654 321",
    startPoint:
      "FPT Software Ho Chi Minh - F-Town 3, Long Thạnh Mỹ, Quận 9, Thành phố Hồ Chí Minh",
    endPoint:
      "Vincom Landmark 81, 720A Điện Biên Phủ, Phường 22, Bình Thạnh, Thành phố Hồ Chí Minh",
  };

  const socket = useContext(WebsocketContext);
  const driver = useSelector((state: AppState) => state.app.driver);
  const [appointment, setAppointment] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [show, setShow] = useState(false);
  const [isOnline, setIsOnline] = useState(true);

  const handleToggleStatus = () => {
    setIsOnline(!isOnline);
  };

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

  useEffect(() => {
    console.log(isOnline);
  }, [isOnline]);

  const onAccept = () => {
    socket.emit("ACCEPT_APPOINTMENT", {
      room_id: "car:567",
      driver,
    });
  };

  const onReject = () => {
    setAppointment(null);
    // socket.emit("REJECT_APPOINTMENT", {
    //   room_id: "car:567",
    //   driver,
    // });
  };

  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
      }}
    >
      <Box
        sx={{
          background: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          padding: "10px",
          color: "#00155F",
          borderRadius: "10px",
          boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
        }}
      >
        <MenuIcon sx={{ width: "50px" }}></MenuIcon>
        <Typography
          sx={{
            textAlign: "center",
            fontSize: "18px",
            fontWeight: 600,
            fontFamily: "Montserrat",
          }}
        >
          {isOnline ? "Online" : "Offline"}
        </Typography>
        <Switch
          onChange={handleToggleStatus}
          sx={{ width: "50px" }}
          color="success"
          value={isOnline}
          defaultChecked
        />
      </Box>

      <Box sx={{ flex: 1, marginTop: "20px" }}>
        <Box
          sx={{
            background: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            padding: "10px",
            color: "#00155F",
            borderRadius: "10px",
            boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
          }}
        >
          <Box sx={{ display: "flex" }}>
            <img className="avatar" src="imgs/avatar-men.png" alt="" />
            <Box
              sx={{
                marginLeft: "20px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography
                sx={{
                  fontSize: "18px",
                  fontWeight: 600,
                  marginBottom: "10px",
                  fontFamily: "Montserrat",
                }}
              >
                {driver?.name}
              </Typography>
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    color: "#FF7F00",
                  }}
                >
                  <LocalPhoneOutlinedIcon sx={{ fontSize: "20px" }} />
                  <Typography
                    sx={{
                      marginLeft: "10px",
                      fontSize: "14px",
                      fontWeight: 500,
                      fontFamily: "Montserrat",
                    }}
                  >
                    0987 654 321
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    color: "#FF7F00",
                  }}
                >
                  <ToysOutlinedIcon sx={{ fontSize: "20px" }} />
                  <Typography
                    sx={{
                      marginLeft: "10px",
                      fontSize: "14px",
                      fontWeight: 500,
                      fontFamily: "Montserrat",
                    }}
                  >
                    {driver?.carLicense} | {driver?.carType}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            background: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            padding: "10px",
            borderRadius: "10px",
            boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
            marginTop: "20px",
            color: "#00155F",
          }}
        >
          <Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <FmdGoodOutlinedIcon />
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: 600,
                  marginLeft: "10px",
                  fontFamily: "Montserrat",
                  color: "#777",
                }}
              >
                Vị trí hiện tại:
              </Typography>
            </Box>
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: 500,
                marginLeft: "10px",
                fontFamily: "Montserrat",
              }}
            >
              {driver?.currentAddress}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Notification new apppoiment */}
      {!!appointment && (
        <Box
          sx={{
            background: "#fff",
            display: "flex",
            flexDirection: "column",
            color: "#00155F",
            boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
            borderRadius: "20px",
            marginBottom: "10px",
            padding: "20px 10px",
          }}
        >
          <Box sx={{ marginBottom: "20px" }}>
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: 600,
                fontFamily: "Montserrat",
              }}
            >
              Chuyến xe mới
            </Typography>
          </Box>
          <Box
            sx={{ display: "flex", alignItems: "center", marginBottom: "20px" }}
          >
            <img className="avatar" src="imgs/avatar-men.png" alt="" />
            <Box sx={{ marginLeft: "20px" }}>
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: 600,
                  fontFamily: "Montserrat",
                }}
              >
                {appointment?.name}
              </Typography>
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: 500,
                  fontFamily: "Montserrat",
                  color: "#FF7F00",
                }}
              >
                {appointment?.phone}
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{ display: "flex", alignItems: "center", marginBottom: "20px" }}
          >
            <AdjustIcon></AdjustIcon>
            <Box
              sx={{
                marginLeft: "20px",
                paddingBottom: "10px",
                borderBottom: "1px solid #777",
              }}
            >
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: 600,
                  fontFamily: "Montserrat",
                  color: "#777",
                  marginBottom: "10px",
                }}
              >
                Địa điểm đón khách
              </Typography>
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: 500,
                  fontFamily: "Montserrat",
                }}
              >
                {appointment?.startPoint}
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{ display: "flex", alignItems: "center", marginBottom: "20px" }}
          >
            <FmdGoodIcon
              sx={{
                color: "#FF7F00",
              }}
            ></FmdGoodIcon>
            <Box
              sx={{
                marginLeft: "20px",
                paddingBottom: "10px",
              }}
            >
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: 600,
                  fontFamily: "Montserrat",
                  color: "#777",
                  marginBottom: "10px",
                }}
              >
                Địa điểm trả khách
              </Typography>
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: 500,
                  fontFamily: "Montserrat",
                }}
              >
                {appointment?.endPoint}
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button
              sx={{
                fontWeight: 400,
                marginRight: "20px",
              }}
              variant="contained"
              color="error"
              onClick={onReject}
            >
              Từ chối
            </Button>
            <Button
              sx={{
                fontWeight: 400,
                fontSize: "14px",
              }}
              variant="contained"
              color="success"
              onClick={onAccept}
            >
              Nhận chuyến
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Dashboard;
