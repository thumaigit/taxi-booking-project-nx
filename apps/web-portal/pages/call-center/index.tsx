/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import { WebsocketContext } from "@@contexts/WebsocketContext";
import AdjustIcon from "@mui/icons-material/Adjust";
import AlarmOutlinedIcon from "@mui/icons-material/AlarmOutlined";
import CloseIcon from "@mui/icons-material/Close";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import Alert from "@mui/material/Alert";

import {
  useCreateAppointmentMutation,
  useFindInfoByPhoneMutation,
} from "@@store/api";
import {
  Box,
  Button,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";

const CallCenter = () => {
  const socket = useContext(WebsocketContext);
  const initValue = {
    clientPhone: "",
    clientName: "",
    startPoint: "",
    endPoint: "",
    carType: "any",
    payment: "cash",
  };

  const [alert, setAlert] = useState(null);
  const [token, setToken] = useState("");
  const [rideHistory, setRideHistory] = useState(null);
  const [frequentlyAddress, setFrequentlyAddress] = useState([]);
  const [findInfo, findResult] = useFindInfoByPhoneMutation();
  const [createAppointment, createResult] = useCreateAppointmentMutation();

  const [form, setFormValue] = useState(initValue);

  const updateField = (e) => {
    setFormValue({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const [incomingCallPhone, setIncomingCallPhone] = useState("");

  useEffect(() => {
    socket.on("newIncomingCall", (clientPhone) => {
      console.log(clientPhone);
      setFormValue({ ...form, clientPhone });
      setAlert({ message: "Bạn có cuộc gọi đến", severity: "info" });
      findInfo(clientPhone);
    });

    return () => {
      socket.off("newIncomingCall");
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    createAppointment(form);
  };
  const handleCheckPhoneNumber = () => {
    const { clientPhone } = form;
    if (!clientPhone) return;
    findInfo(clientPhone);
  };
  useEffect(() => {
    setToken(token);
  }, []);

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => {
        setAlert(null);
        clearTimeout(timer);
      }, 10000);
    }
  }, [alert]);

  useEffect(() => {
    if (findResult.isSuccess) {
      const { data } = findResult;

      if (data?.ride_history.length > 0) {
        setRideHistory(data.ride_history);
        setFrequentlyAddress(data.frequently_address);
        setFormValue({ ...form, clientName: data[0]?.clientName });
      } else {
        const { clientPhone } = form;
        setAlert({
          message: "Số điện thoại chưa có chuyến đi nào",
          severity: "info",
        });
        setRideHistory(null);
        setFormValue({ ...initValue, clientPhone });
      }
    }
  }, [findResult.isSuccess]);

  useEffect(() => {
    if (createResult.isSuccess) {
      socket.emit("NEW_APPOINTMENT", { ...createResult.data });
      setAlert({ message: "Đặt chuyến thành công. Đang tìm kiếm tài xế" });
    }
  }, [createResult.isSuccess]);

  return (
    <Box sx={{ display: "flex" }}>
      <Box sx={{ flex: 2, padding: "20px" }}>
        <Typography
          sx={{
            fontSize: "20px",
            fontWeight: 600,
            fontFamily: "Montserrat",
            color: "#FF7F00",
            margin: "10px 0",
          }}
        >
          Booking Now
        </Typography>
        <Box
          sx={{
            height: "70px",
          }}
        >
          {alert && (
            <Alert
              severity={alert?.severity || "success"}
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setAlert(null);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2, fontFamily: "Montserrat", fontWeight: 600 }}
            >
              {alert?.message}
            </Alert>
          )}
        </Box>
        <Box sx={{ color: "#00155F" }}>
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
              <Box sx={{ display: "flex" }}>
                <TextField
                  size="small"
                  sx={{
                    flex: 1,
                    fontFamily: "Montserrat",
                    fontWeight: 500,
                  }}
                  value={form.clientPhone}
                  type="text"
                  name="clientPhone"
                  onChange={updateField}
                  inputProps={{
                    style: {
                      padding: "5px 10px",
                    },
                  }}
                  required
                />
                <Button
                  sx={{
                    fontFamily: "Montserrat",
                    padding: "5px 10px",
                  }}
                  onClick={handleCheckPhoneNumber}
                >
                  Kiểm tra
                </Button>
              </Box>
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
                sx={{
                  flex: 1,
                  fontFamily: "Montserrat",
                  fontWeight: 500,
                }}
                value={form.clientName}
                type="text"
                name="clientName"
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
                sx={{
                  flex: 1,
                  fontFamily: "Montserrat",
                  fontWeight: 500,
                }}
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
                sx={{
                  flex: 1,
                  fontFamily: "Montserrat",
                  fontWeight: 500,
                }}
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
            <Box sx={{ display: "flex" }}>
              <Box>
                <Typography
                  sx={{
                    fontFamily: "Montserrat",
                    fontWeight: 500,
                    marginRight: "10px",
                    fontSize: "15px",
                    marginBottom: "5px",
                    color: "#555",
                  }}
                >
                  Loại xe:
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Select
                    size="small"
                    value={form.carType}
                    name={"carType"}
                    onChange={updateField}
                    displayEmpty
                    inputProps={{
                      sx: {
                        fontFamily: "Montserrat",
                        fontWeight: 500,
                        fontSize: "15px",
                        padding: "5px 20px",
                        textAlign: "center",
                      },
                    }}
                  >
                    <MenuItem sx={{ fontFamily: "Montserrat" }} value={"4 chỗ"}>
                      4 chỗ
                    </MenuItem>
                    <MenuItem sx={{ fontFamily: "Montserrat" }} value={"7 chỗ"}>
                      7 chỗ
                    </MenuItem>
                    <MenuItem sx={{ fontFamily: "Montserrat" }} value="any">
                      Bất kỳ
                    </MenuItem>
                  </Select>
                </Box>
              </Box>
              <Box sx={{ ml: "20px" }}>
                <Typography
                  sx={{
                    fontFamily: "Montserrat",
                    fontWeight: 500,
                    marginRight: "10px",
                    fontSize: "15px",
                    marginBottom: "5px",
                    color: "#555",
                  }}
                >
                  Hình thức thanh toán:
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Select
                    size="small"
                    value={form.payment}
                    name={"payment"}
                    onChange={updateField}
                    displayEmpty
                    inputProps={{
                      sx: {
                        fontFamily: "Montserrat",
                        fontWeight: 500,
                        fontSize: "15px",
                        padding: "5px 20px",
                        textAlign: "center",
                      },
                    }}
                  >
                    <MenuItem sx={{ fontFamily: "Montserrat" }} value={"cash"}>
                      Thanh toán bằng tiền mặt
                    </MenuItem>
                    <MenuItem sx={{ fontFamily: "Montserrat" }} value={"card"}>
                      Thanh toán qua thẻ
                    </MenuItem>
                  </Select>
                </Box>
              </Box>
            </Box>
            <Box sx={{ mt: "20px" }}>
              <Button
                variant="contained"
                sx={{
                  fontFamily: "Montserrat",
                  fontWeight: 600,
                  background: "#00155F",
                  minWidth: "200px",
                }}
                onClick={handleSubmit}
              >
                Đặt xe
              </Button>
            </Box>
          </form>
        </Box>
      </Box>

      <Box
        sx={{
          flex: 5,
          height: "100vh",
          overflow: "auto",
          padding: "0 20px",
        }}
      >
        {rideHistory && (
          <Box>
            <Box>
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: 600,
                  fontFamily: "Montserrat",
                  color: "#FF7F00",
                  margin: "10px 0",
                }}
              >
                Top 5 địa chỉ di chuyển nhiều nhất
              </Typography>
              {frequentlyAddress.map((value, index) => (
                <Box
                  key={index}
                  sx={{
                    background: "#fff",
                    padding: "10px",
                    color: "#00155F",
                    borderRadius: "10px",
                    marginBottom: "20px",
                    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: 500,
                        fontFamily: "Montserrat",
                        margin: "10px 0",
                      }}
                    >
                      #{index + 1} {value.endPoint}
                    </Typography>
                    <Button
                      onClick={() => {
                        setFormValue({ ...form, endPoint: value.endPoint });
                      }}
                    >
                      Chọn
                    </Button>
                  </Box>
                </Box>
              ))}
            </Box>

            <Box>
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: 600,
                  fontFamily: "Montserrat",
                  color: "#FF7F00",
                  margin: "10px 0",
                }}
              >
                5 Cuộc gọi gần nhất
              </Typography>
              <Box>
                {rideHistory.map((appointment) => (
                  <Box
                    key={appointment?.id}
                    sx={{
                      background: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
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
                          {appointment?.clientName}
                        </Typography>
                        <Box>
                          <Box>
                            <Box sx={{ display: "flex", marginBottom: "5px" }}>
                              <Box
                                sx={{
                                  display: "flex",
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
                                  {appointment?.clientPhone}
                                </Typography>
                              </Box>
                              <Box
                                sx={{
                                  display: "flex",
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
                                  {appointment?.createdAt}
                                </Typography>
                              </Box>
                            </Box>

                            <Box
                              sx={{
                                display: "flex",
                                marginBottom: "5px",
                              }}
                            >
                              <AdjustIcon sx={{ fontSize: "20px" }} />
                              <Typography
                                sx={{
                                  marginLeft: "10px",
                                  fontSize: "14px",
                                  fontWeight: 500,
                                  fontFamily: "Montserrat",
                                }}
                              >
                                {appointment?.startPoint}
                              </Typography>
                            </Box>
                            <Box
                              sx={{
                                display: "flex",
                              }}
                            >
                              <FmdGoodIcon sx={{ fontSize: "20px" }} />
                              <Typography
                                sx={{
                                  marginLeft: "10px",
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
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        )}
        {!rideHistory && <Box></Box>}
      </Box>
    </Box>
  );
};

export default CallCenter;
