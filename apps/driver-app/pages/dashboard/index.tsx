/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import { formatPhoneNumber } from "@@common/formatPhoneNumber";
import { WebsocketContext } from "@@contexts/WebsocketContext";
import { useUpdateDriverMutation } from "@@store/api";
import { setDriver } from "@@store/appSlice";
import { AppState } from "@@store/store";
import AdjustIcon from "@mui/icons-material/Adjust";
import AutorenewOutlinedIcon from "@mui/icons-material/AutorenewOutlined";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import ToysOutlinedIcon from "@mui/icons-material/ToysOutlined";
import { Box, Button, TextField, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import LinearProgress from "@mui/material/LinearProgress";
import Switch from "@mui/material/Switch";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Dashboard = () => {
  const socket = useContext(WebsocketContext);
  const dispatch = useDispatch();
  const driver = useSelector((state: AppState) => state.app.driver);
  const [newAppointment, setNewAppointment] = useState(null);
  const [appointmentAssigned, setAppointmentAsigned] = useState(null);
  const [newAddress, setNewAddress] = useState("");
  const [isOnline, setIsOnline] = useState(true);
  const [isWaiting, setIsWaiting] = useState(false);
  const [isAlreadyAssign, setIsAlreadyAssign] = useState(false);
  const [updateDriver, updateResult] = useUpdateDriverMutation();
  const handleToggleStatus = () => {
    setIsOnline(!isOnline);
  };

  const handleUpdateAddress = () => {
    updateDriver({ id: driver.id, body: { currentAddress: newAddress } });
  };

  useEffect(() => {
    socket.on("newAppointment", (payload) => {
      setNewAppointment(payload);
    });

    socket.on("assignAppointment", (payload) => {
      if (payload.driverId === driver.id) {
        setAppointmentAsigned(payload);
        setIsWaiting(false);
      } else {
        setIsWaiting(false);
        setIsAlreadyAssign(true);
      }
    });

    return () => {
      socket.off("newAppointment");
      socket.off("assignAppointment");
    };
  }, []);

  useEffect(() => {
    if (isOnline) {
      socket.emit("DRIVER_READY", driver);
    } else {
      socket.emit("DRIVER_OFFLINE", driver);
    }
  }, [isOnline]);

  useEffect(() => {
    if (isAlreadyAssign) {
      const timer = setTimeout(() => {
        setIsAlreadyAssign(false);
        clearTimeout(timer);
      }, 4000);
    }
  }, [isAlreadyAssign]);

  const onAccept = async () => {
    await socket.emit("ACCEPT_APPOINTMENT", {
      driver,
      appointment: newAppointment,
    });
    setIsWaiting(true);
    setNewAppointment(null);
  };

  const onReject = () => {
    setNewAppointment(null);
    socket.emit("REJECT_APPOINTMENT", {
      driver,
      newAppointment,
    });
  };

  useEffect(() => {
    if (updateResult.isSuccess) {
      dispatch(setDriver(updateResult.data));
    }
  }, [updateResult.isSuccess]);

  useEffect(() => {
    if (newAppointment) {
      const timer = setTimeout(() => {
        setNewAppointment(null);

        clearTimeout(timer);
      }, 10000);
    }
  }, [newAppointment]);
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
                    {formatPhoneNumber(driver?.phone)}
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
        {isAlreadyAssign && (
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
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: 600,
                  marginLeft: "10px",
                  fontFamily: "Montserrat",
                }}
              >
                Chuyến xe đã được điều phối cho tài xế khác
              </Typography>
            </Box>
          </Box>
        )}

        {isWaiting ? (
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
              <LinearProgress color="inherit" />
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: 600,
                  marginLeft: "10px",
                  fontFamily: "Montserrat",
                  marginTop: "20px",
                }}
              >
                Xác nhận chuyến đi thành công. Vui lòng đợi trong ít phút
              </Typography>
            </Box>
          </Box>
        ) : (
          <Box
            sx={{
              display: newAppointment ? "none" : "",
              background: "#fff",
              width: "100%",
              padding: "10px",
              borderRadius: "10px",
              boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
              marginTop: "20px",
              color: "#00155F",
            }}
          >
            <Box sx={{ display: "flex" }}>
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
                <TextField
                  size="small"
                  sx={{
                    flex: 1,
                    fontFamily: "Montserrat",
                    fontWeight: 500,
                  }}
                  value={newAddress}
                  type="text"
                  name="newAddress"
                  onChange={(e) => {
                    setNewAddress(e.target.value);
                  }}
                  inputProps={{
                    style: {
                      padding: "7px 10px",
                      fontFamily: "Montserrat",
                      fontWeight: 500,
                      fontSize: "14px",
                    },
                  }}
                  required
                />
              </Box>

              {!updateResult.isLoading ? (
                <AutorenewOutlinedIcon
                  onClick={handleUpdateAddress}
                  sx={{ mt: "5px", ml: "5px", cursor: "pointer" }}
                />
              ) : (
                <CircularProgress
                  sx={{
                    width: "20px !important",
                    height: "20px !important",
                    mt: "7px",
                    ml: "9px",
                  }}
                />
              )}
            </Box>
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
        )}

        {appointmentAssigned && (
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
              marginTop: "20px",
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
                Đang đón khách
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginBottom: "20px",
              }}
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
                  {appointmentAssigned?.clientName}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: 500,
                    fontFamily: "Montserrat",
                    color: "#FF7F00",
                  }}
                >
                  {formatPhoneNumber(appointmentAssigned?.clientPhone)}
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginBottom: "20px",
              }}
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
                  {appointmentAssigned?.startPoint}
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginBottom: "20px",
              }}
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
                  {appointmentAssigned?.endPoint}
                </Typography>
              </Box>
            </Box>
          </Box>
        )}
      </Box>

      {/* Notification new apppoiment */}
      {!!newAppointment && (
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
                {newAppointment?.clientName}
              </Typography>
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: 500,
                  fontFamily: "Montserrat",
                  color: "#FF7F00",
                }}
              >
                {formatPhoneNumber(newAppointment?.clientPhone)}
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
                {newAppointment?.startPoint}
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
                {newAppointment?.endPoint}
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
