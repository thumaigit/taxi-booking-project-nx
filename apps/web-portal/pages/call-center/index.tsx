import React, { ChangeEvent, useCallback, useContext, useEffect } from "react";
import { useState } from "react";
import styles from "./index.module.css";
import ReactMapGL from "@goongmaps/goong-map-react";
import { WebsocketContext } from "@@contexts/WebsocketContext";

/* eslint-disable-next-line */
export interface CallCenterProps {}

export interface Ride {
  pickup_address: string;
  arrive_address: string;
  payment: string;
  car_type: string;
}

export interface User {
  fullName: string;
  phoneNumber: string;
  currentPickupAddress: string;
  currentArriveAddress: string;
  currentPayment: string;
  currentCarType: string;
  rideHistory: Ride[];
  frequentlyAddress: { arrive_address: string }[];
}

export interface PostRide {
  user_id: string;
  pickup_address: string;
  arrive_address: string;
  payment: string;
  car_type: string;
}

const renderUser = {
  fullName: "",
  phoneNumber: "",
  currentArriveAddress: "",
  currentPickupAddress: "",
  currentCarType: "4 seats",
  currentPayment: "cash",
  rideHistory: [],
  frequentlyAddress: [{ arrive_address: "" }],
};

export function CallCenter(props: CallCenterProps) {
  const socket = useContext(WebsocketContext);
  const [appointmentId, setAppointmentId] = useState(null);
  const [token, setToken] = useState("");
  const [inputs, setInputs] = useState<User>(renderUser);
  const GOONG_MAPTILES_KEY = "qlG01cOG4q7MHDCzbpn7vA6GvKHs06W4lZlq3PLl";
  const MAP_API_KEY = "0zKkBcMbQKAkWsB23qQAeFiGPQN4uQ1tsMeN0ZdG";
  const adminId = "cl9chgyyq0000m1a6xoyu6rsb";
  const [userId, setUserId] = useState(adminId);
  const [viewport, setViewport] = useState({
    width: 400,
    height: 400,
    latitude: 10.777998266547124,
    longitude: 106.69535160710402,
    zoom: 15,
  });

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const name = event.target.name;
    setInputs((values) => ({
      ...values,
      [name]: value,
    }));
  }, []);

  const handleSelectChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const value = event.target.value;
      const name = event.target.name;
      setInputs((values) => ({
        ...values,
        [name]: value,
      }));
    },
    []
  );

  const createRide = async () => {
    const currentRide = {
      user_id: userId,
      arrive_address: inputs.currentArriveAddress,
      pickup_address: inputs.currentPickupAddress,
      car_type: inputs.currentCarType,
      payment: inputs.currentPayment,
    };

    const reponse = await fetch(`http://localhost:3000/api/ride`, {
      method: "POST",
      body: JSON.stringify(currentRide),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    // if (reponse.status == 201) {
    //   alert('Sucess');
    //   setInputs(renderUser);
    // }
  };

  const assignDriver = async () => {
    const pickupAddress = inputs.currentPickupAddress;
    const reponse = await fetch(
      `http://localhost:3000/api/${pickupAddress}/assign`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (reponse.status == 200) {
      const drivers = await reponse.json().then((drivers) => {
        return drivers;
      });

      console.log(drivers);

      drivers.forEach((driver) => {
        sentNotification(driver.driver_firebase_token);
      });
    }
  };

  const sentNotification = async (driver: string) => {
    const notificationBody = {
      to: `${driver}`,
      priority: "high",
      notification: {
        body: "Got Ride!",
      },
    };

    const reponse = await fetch(`https://fcm.googleapis.com/fcm/send`, {
      method: "POST",
      body: JSON.stringify(notificationBody),
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "key=AAAAFQ7SrF0:APA91bGQ5VhXQCBMndX_4uytFVycZzuZ641kCjNg7IJCjLA7x9RUmprDAvQZomRLrZzhuQawy2o-HaT3h2yxaySpgPnDUF1FdWMrsVKoDuMKlThlM9LG6IxI96MnEDY9j5xP0gsdL3NQ",
      },
    });
    console.log(driver);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    createRide();
    assignDriver();
  };

  const handleNumberChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      const name = event.target.name;
      setInputs((values) => ({
        ...values,
        [name]: value,
      }));
    },
    []
  );

  const onSetArriveAddress = (arriveAddress: string) => {
    setInputs((values) => ({
      ...values,
      currentArriveAddress: arriveAddress,
    }));
  };

  const onSearchMap = async () => {
    const goongHost = "https://rsapi.goong.io";
    const apiKey = `api_key=${MAP_API_KEY}`;
    const arriveAddParams = `geocode?address=${inputs.currentArriveAddress}`;
    const pickupAddParams = `geocode?address=${inputs.currentPickupAddress}`;
    await fetch(`${goongHost}/${arriveAddParams}&${apiKey}`)
      .then((res) => res.json())
      .then((data) => {
        const geo = data?.results[0]?.geometry?.location;
        setViewport((view) => ({
          ...view,
          latitude: geo.lat,
          longitude: geo.lng,
        }));
      });

    await fetch(`${goongHost}/${pickupAddParams}&${apiKey}`)
      .then((res) => res.json())
      .then((data) => {
        const geo = data?.results[0]?.geometry?.location;
      });
  };

  const handleCallAccept = () => {
    setInputs((input) => ({ ...input, phoneNumber: "01231231238" }));
  };

  const handleLogout = () => {
    localStorage.setItem("token", "");
    window.location.href = "/";
  };

  useEffect(() => {
    if (inputs.phoneNumber?.length >= 11) {
      fetch(`http://localhost:3000/api/${inputs.phoneNumber}/ride`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((user) => {
          if (!user.error) {
            const fetchedUser = {
              fullName: user.basic_info?.full_name,
              phoneNumber: user.basic_info?.phone_number,
              rideHistory: user.ride_history,
              frequentlyAddress: user.frequently_address,
            };
            const userId = user.basic_info?.user_id;
            setInputs((inputs) => ({
              ...inputs,
              ...fetchedUser,
            }));
            setUserId(userId);
          } else return;
        });
    }
  }, [inputs.phoneNumber, token, userId]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
  }, []);

  useEffect(() => {
    socket.on("newAppointment", (payload) => {
      console.log(payload);
      setAppointmentId(payload?.id);
    });

    socket.on("acceptAppointment", (payload) => {
      console.log(payload);
    });

    return () => {
      socket.off("newAppointment");
      socket.off("acceptAppointment");
    };
  }, []);

  const onJoinRoom = () => {
    socket.emit("JOIN_ROOM")
  }

  return (
    <>
      <div className={styles["wrapper"]}>
        <div className={styles["container"]}>
          <div className={styles["title"]}>
            <h1>Booking Now</h1>
          </div>
          <div className={styles["text-container"]}>
            <span>Customer is calling...</span>
            <button onClick={handleCallAccept}>Accept</button>
          </div>
          <div className={styles["text-container"]}>
            <button onClick={handleLogout}>Logout</button>
          </div>
          <div className={styles["card"]}>
            <form onSubmit={handleSubmit} className={styles["form"]}>
              <div className={styles["text-container"]}>
                <div className={styles["layer"]}>
                  <h4>User Details</h4>
                  <label>
                    <input
                      placeholder="Fullname"
                      type="text"
                      name="fullName"
                      value={inputs?.fullName || ""}
                      onChange={handleChange}
                      required
                    />
                  </label>
                  <label>
                    <input
                      placeholder="Phone number"
                      type="text"
                      name="phoneNumber"
                      value={inputs?.phoneNumber || ""}
                      onChange={handleNumberChange}
                      required
                    />
                  </label>
                  <label>
                    <h5>Top 5 latest calls</h5>
                    <table className={styles["history-table"]}>
                      <thead>
                        <tr>
                          <th>Arrive Add.</th>
                          <th>Pickup Add.</th>
                          <th>Payment</th>
                          <th>Car Type</th>
                        </tr>
                      </thead>
                      <tbody>
                        {inputs?.rideHistory?.map((ride, index) => {
                          return (
                            <tr key={index}>
                              <td>{ride.arrive_address}</td>
                              <td>{ride.pickup_address}</td>
                              <td>{ride.payment}</td>
                              <td>{ride.car_type}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </label>
                  <label>
                    <h5>Top 5 frequently arrive address</h5>
                    <table className={styles["history-table"]}>
                      <thead>
                        <tr>
                          <th>Arrive Add.</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {inputs?.frequentlyAddress?.map((add, index) => {
                          return (
                            <tr key={index}>
                              <td>{add.arrive_address}</td>
                              <td>
                                <button
                                  onClick={() =>
                                    onSetArriveAddress(add.arrive_address)
                                  }
                                >
                                  Pick
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </label>
                </div>
                <div className={styles["layer"]}>
                  <h4>Address Details</h4>
                  <label>
                    <input
                      placeholder="Arrive Address"
                      type="text"
                      name="currentArriveAddress"
                      value={inputs?.currentArriveAddress || ""}
                      onChange={handleChange}
                      required
                    />
                  </label>
                  <label>
                    <input
                      placeholder="Pickup Address"
                      type="text"
                      name="currentPickupAddress"
                      value={inputs?.currentPickupAddress || ""}
                      onChange={handleChange}
                      required
                    />
                    <button onClick={onSearchMap}>Search Map</button>
                  </label>
                  <label>
                    <h5>Map</h5>
                    <div className={styles["map-container"]}></div>
                  </label>
                </div>
                <div className={styles["layer"]}>
                  <h4>Ride Details</h4>
                  <label>
                    <h5>Car Type</h5>
                    <select
                      name="currentCarType"
                      value={inputs?.currentCarType}
                      onChange={handleSelectChange}
                      required
                    >
                      <option value="4 seats">4 Seats</option>
                      <option value="7 seats">7 Seats</option>
                      <option value="any">Any</option>
                    </select>
                  </label>
                  <label>
                    <h5>Payment</h5>
                    <select
                      name="currentPayment"
                      value={inputs?.currentPayment}
                      onChange={handleSelectChange}
                      required
                    >
                      <option value="cash">Cash</option>
                      <option value="card">Card</option>
                    </select>
                  </label>
                </div>
                <div className={styles["align-right"]}>
                  <input type="submit" value={"Book Ride"} />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <button onClick={onJoinRoom}>JOIN ROOM</button>
    </>
  );
}

export default CallCenter;
