/* eslint-disable react-hooks/exhaustive-deps */
import { TabPanel } from "@@components/TabPanel";
import { WebsocketContext } from "@@contexts/WebsocketContext";
import {
  useFindDriverByAppointmentMutation,
  useGetAllAppointmentMutation,
} from "@@store/api";
import AdjustIcon from "@mui/icons-material/Adjust";
import AlarmOutlinedIcon from "@mui/icons-material/AlarmOutlined";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import ToysOutlinedIcon from "@mui/icons-material/ToysOutlined";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

const Appointment = () => {
  const socket = useContext(WebsocketContext);
  const router = useRouter();
  const { asPath } = useRouter();
  const [appointments, setAppointments] = useState([]);
  const [driversForAppointment, setDriversForAppointment] = useState([]);
  const [appointmentChoosed, setAppointmentChoosed] = useState(null);
  const [appointmentAssigned, setAppointmentAssigned] = useState(false);
  const [getAppointment, getAppointmentResult] = useGetAllAppointmentMutation();
  const [findDriver, findDriverResult] = useFindDriverByAppointmentMutation();
  const [newAction, setNewAction] = useState(null);
  const [newAssign, setNewAssign] = useState(null);
  const [tab, setTab] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const handleDriverStatus = (value) => {
    if (value.driver.id === value.appointment.driverId) return "Đang đón khách";

    switch (value.action) {
      case "WAITING":
        return "Chờ xác nhận";
      case "ACCEPTED":
        return "Chờ điều phối";
      case "REJECTED":
        return "Từ chối";
      default:
        return "";
    }
  };

  const DriverStatusCss = (value) => {
    if (value.driver.id === value.appointment.driverId) return "#009688";

    switch (value.action) {
      case "WAITING":
        return "#3F51B5";
      case "ACCEPTED":
        return "#4CAf50";
      case "REJECTED":
        return "#F44336";
      default:
        return "inherit";
    }
  };

  const handleChooseAppointment = (id) => {
    router.push(`/appointment#${id}`);
  };

  useEffect(() => {
    socket.on("newMessage", (payload) => {
      const { title, value } = payload;
      if (title === "ACCEPT_APPOINTMENT" || title === "REJECT_APPOINTMENT") {
        setNewAction(value);
      }

      if (title === "NEW_APPOINTMENT") {
        getAppointment(null);
      }

      if (title === "ASSIGN_APPOINTMENT") {
        setNewAssign(value);
        getAppointment(null);
      }
    });

    return () => {
      socket.off("newMessage");
    };
  }, []);

  useEffect(() => {
    if (getAppointmentResult.isSuccess) {
      setAppointments(getAppointmentResult.data);
    }
  }, [getAppointmentResult.isSuccess, getAppointmentResult.isLoading]);

  useEffect(() => {
    const hash = asPath.split("#")[1];
    if (appointmentChoosed !== hash) {
      setAppointmentChoosed(hash);
      findDriver(hash);
    }
  }, [asPath]);

  useEffect(() => {
    const hash = asPath.split("#")[1];
    if (newAction == hash || newAssign == hash) {
      findDriver(hash);
    }
  }, [newAction, newAssign]);

  useEffect(() => {
    getAppointment(null);
  }, []);

  useEffect(() => {
    if (findDriverResult.isSuccess) {
      const { data } = findDriverResult;
      setDriversForAppointment(data);

      if (data.length > 0 && data[0].appointment.driverId) {
        setAppointmentAssigned(true);
      } else {
        setAppointmentAssigned(false);
      }
    }
  }, [findDriverResult.isSuccess, findDriverResult.isLoading]);

  return (
    <Box sx={{ display: "flex", padding: '0 30px' }}>
      <Box
        sx={{
          flex: 1,
          height: "100vh",
          overflow: "auto",
          padding: "10px 0",
          paddingRight: '20px'
        }}
      >
        {appointments.map((appointment) => (
          <Box
            onClick={() => {
              handleChooseAppointment(appointment.id);
            }}
            key={appointment.id}
            sx={{
              display: "flex",
              flexDirection: "column",
              padding: "20px",
              marginBottom: "20px",
              borderRadius: "10px",
              boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
              cursor: "pointer",
              borderLeft:
                appointment.id == appointmentChoosed
                  ? "3px solid #35b369"
                  : "3px solid #fff",
            }}
          >
            <Box
              sx={{
                flex: 1,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
                paddingBottom: "10px",
                borderBottom: "1px solid #ccc",
              }}
            >
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: 600,
                  fontFamily: "Montserrat",
                  color: "#FF7F00",
                }}
              >
                {`#${appointment?.id}`}
              </Typography>
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: 600,
                  fontFamily: "Montserrat",
                  color: appointment?.driverId ? "green" : "#0a90d5",
                }}
              >
                {appointment?.driverId ? "Đã hoàn thành" : "Đang chờ điều phối"}
              </Typography>
            </Box>

            <Box
              sx={{
                flex: 1,
              }}
            >
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
                    {appointment?.endPoint}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>

      <Box
        sx={{
          flex: 2,
          marginLeft: "20px",
        }}
      >
        <Box sx={{ width: "100%" }}>
          <Tabs
            value={tab}
            onChange={handleChange}
            textColor="inherit"
            TabIndicatorProps={{
              style: {
                backgroundColor: "#FF7F00",
              },
            }}
          >
            <Tab
              sx={{
                fontSize: "14px",
                fontWeight: 600,
                fontFamily: "Montserrat",
              }}
              value={0}
              label="Cổng thông tin"
            />
            <Tab
              sx={{
                fontSize: "14px",
                fontWeight: 600,
                fontFamily: "Montserrat",
              }}
              value={1}
              label="Thông tin khách hàng"
            />
          </Tabs>
        </Box>
        <Box>
          <TabPanel value={tab} index={0}>
            <Box
              sx={{
                padding: "20px",
                color: "#00155F",
              }}
            >
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: 600,
                  fontFamily: "Montserrat",
                  marginBottom: "20px",
                }}
              >
                {appointmentAssigned
                  ? "Tài xế đã nhận chuyến đi"
                  : "Tài xế trong phạm vi 2km"}
              </Typography>
              {driversForAppointment.map((driver) => {
                const direction = JSON.parse(driver.direction);
                if (appointmentAssigned) {
                  if (driver.driverId === driver.appointment.driverId) {
                    return (
                      <Box
                        key={driver.driverId}
                        sx={{
                          background: "#fff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          width: "100%",
                          padding: "10px",
                          color: "#00155F",
                          borderRadius: "10px",
                          marginBottom: "20px",
                          boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                        }}
                      >
                        <Box sx={{ display: "flex" }}>
                          <img
                            className="avatar"
                            src="imgs/avatar-men.png"
                            alt=""
                          />
                          <Box
                            sx={{
                              marginLeft: "20px",
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                            <Typography
                              sx={{
                                fontSize: "16px",
                                fontWeight: 600,
                                marginBottom: "10px",
                                fontFamily: "Montserrat",
                              }}
                            >
                              {driver?.driver?.name}
                            </Typography>
                            <Box>
                              <Box>
                                <Box
                                  sx={{ display: "flex", marginBottom: "5px" }}
                                >
                                  <Box
                                    sx={{
                                      display: "flex",
                                      color: "#FF7F00",
                                      marginRight: "20px",
                                    }}
                                  >
                                    <LocalPhoneOutlinedIcon
                                      sx={{ fontSize: "20px" }}
                                    />
                                    <Typography
                                      sx={{
                                        marginLeft: "10px",
                                        fontSize: "14px",
                                        fontWeight: 500,
                                        fontFamily: "Montserrat",
                                      }}
                                    >
                                      {driver?.driver?.phone}
                                    </Typography>
                                  </Box>
                                  <Box
                                    sx={{
                                      display: "flex",
                                      color: "#FF7F00",
                                    }}
                                  >
                                    <AlarmOutlinedIcon
                                      sx={{ fontSize: "20px" }}
                                    />
                                    <Typography
                                      sx={{
                                        marginLeft: "10px",
                                        fontSize: "14px",
                                        fontWeight: 500,
                                        fontFamily: "Montserrat",
                                      }}
                                    >
                                      {direction?.distance?.text} {` | ~`}
                                      {direction?.duration?.text}
                                    </Typography>
                                  </Box>
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
                                    {driver?.driver?.carLicense}
                                    {` - `}
                                    {driver?.driver?.carName}{" "}
                                    {driver?.driver?.carType}
                                  </Typography>
                                </Box>
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                        <Box sx={{ marginRight: "10px" }}>
                          <Typography
                            sx={{
                              fontSize: "14px",
                              fontWeight: 600,
                              fontFamily: "Montserrat",
                              color: DriverStatusCss(driver),
                            }}
                          >
                            {handleDriverStatus(driver)}
                          </Typography>
                        </Box>
                      </Box>
                    );
                  }
                } else {
                  return (
                    <Box
                      key={driver.driverId}
                      sx={{
                        background: "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "100%",
                        padding: "10px",
                        color: "#00155F",
                        borderRadius: "10px",
                        marginBottom: "20px",
                        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                      }}
                    >
                      <Box sx={{ display: "flex" }}>
                        <img
                          className="avatar"
                          src="imgs/avatar-men.png"
                          alt=""
                        />
                        <Box
                          sx={{
                            marginLeft: "20px",
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: "16px",
                              fontWeight: 600,
                              marginBottom: "10px",
                              fontFamily: "Montserrat",
                            }}
                          >
                            {driver?.driver?.name}
                          </Typography>
                          <Box>
                            <Box>
                              <Box
                                sx={{ display: "flex", marginBottom: "5px" }}
                              >
                                <Box
                                  sx={{
                                    display: "flex",
                                    color: "#FF7F00",
                                    marginRight: "20px",
                                  }}
                                >
                                  <LocalPhoneOutlinedIcon
                                    sx={{ fontSize: "20px" }}
                                  />
                                  <Typography
                                    sx={{
                                      marginLeft: "10px",
                                      fontSize: "14px",
                                      fontWeight: 500,
                                      fontFamily: "Montserrat",
                                    }}
                                  >
                                    {driver?.driver?.phone}
                                  </Typography>
                                </Box>
                                <Box
                                  sx={{
                                    display: "flex",
                                    color: "#FF7F00",
                                  }}
                                >
                                  <AlarmOutlinedIcon
                                    sx={{ fontSize: "20px" }}
                                  />
                                  <Typography
                                    sx={{
                                      marginLeft: "10px",
                                      fontSize: "14px",
                                      fontWeight: 500,
                                      fontFamily: "Montserrat",
                                    }}
                                  >
                                    {direction?.distance?.text} {` | ~`}
                                    {direction?.duration?.text}
                                  </Typography>
                                </Box>
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
                                  {driver?.driver?.carLicense}
                                  {` - `}
                                  {driver?.driver?.carName}{" "}
                                  {driver?.driver?.carType}
                                </Typography>
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                      <Box sx={{ marginRight: "10px" }}>
                        <Typography
                          sx={{
                            fontSize: "14px",
                            fontWeight: 600,
                            fontFamily: "Montserrat",
                            color: DriverStatusCss(driver),
                          }}
                        >
                          {handleDriverStatus(driver)}
                        </Typography>
                      </Box>
                    </Box>
                  );
                }
              })}
            </Box>
          </TabPanel>
          <TabPanel value={tab} index={1}>
            Item Two
          </TabPanel>
        </Box>
      </Box>
    </Box>
  );
};

export default Appointment;
