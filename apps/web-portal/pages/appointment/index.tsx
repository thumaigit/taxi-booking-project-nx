import { WebsocketContext } from "@@contexts/WebsocketContext";
import {
  useCreateAppointmentMutation,
  useGetAllAppointmentMutation,
  useFindDriverByAppointmentMutation,
} from "@@store/api";
import { Box, Button, Tab, Tabs, TextField, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import AdjustIcon from "@mui/icons-material/Adjust";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import ToysOutlinedIcon from "@mui/icons-material/ToysOutlined";
import AlarmOutlinedIcon from "@mui/icons-material/AlarmOutlined";
import { useRouter } from "next/router";
import { TabPanel } from "@@components/TabPanel";

const Appointment = () => {
  const socket = useContext(WebsocketContext);
  const router = useRouter();
  const { asPath } = useRouter();
  const [appointments, setAppointments] = useState([]);
  const [driversForAppointment, setDriversForAppointment] = useState([]);
  const [appointmentChoosed, setAppointmentChoosed] = useState(null);
  const [driverAccept, setDriverAccept] = useState(null);
  const [createAppointment, createResult] = useCreateAppointmentMutation();
  const [getAppointment, getAppointmentResult] = useGetAllAppointmentMutation();
  const [findDriver, findDriverResult] = useFindDriverByAppointmentMutation();

  const [tab, setTab] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const handleChooseAppointment = (id) => {
    router.push(`/appointment#${id}`);
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
    if (getAppointmentResult.isSuccess) {
      setAppointments(getAppointmentResult.data);
    }
  }, [getAppointmentResult.isSuccess]);

  useEffect(() => {
    const hash = asPath.split("#")[1];
    setAppointmentChoosed(hash);
    findDriver(hash);
  }, [asPath]);

  useEffect(() => {
    getAppointment(null);
  }, []);

  useEffect(() => {
    if (createResult.isSuccess) {
      socket.emit("NEW_APPOINTMENT", { ...createResult.data });
    }
  }, [createResult.isSuccess]);

  useEffect(() => {
    if (findDriverResult.isSuccess) {
      setDriversForAppointment(findDriverResult.data);
    }
  }, [findDriverResult.isSuccess]);

  return (
    <Box sx={{ display: "flex" }}>
      <Box
        sx={{
          flex: 1,
        }}
      >
        {/* <Typography
          sx={{
            fontSize: "18px",
            fontWeight: 600,
            fontFamily: "Montserrat",
          }}
        >
          Chuyến xe
        </Typography> */}

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
                  color: "#0a90d5",
                }}
              >
                Đang chờ điều phối
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
                  marginBottom: '20px'
                }}
              >
                Tài xế đang chờ điều phối
              </Typography>
              {driversForAppointment.map((driver) => {
                const direction = JSON.parse(driver.direction);
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
                            <Box sx={{ display: "flex", marginBottom: "5px" }}>
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
                                <AlarmOutlinedIcon sx={{ fontSize: "20px" }} />
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
                    <Box>
                      <Button>
                        Xác nhận
                      </Button>
                    </Box>
                  </Box>
                );
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
