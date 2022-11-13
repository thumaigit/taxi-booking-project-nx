/* eslint-disable react-hooks/exhaustive-deps */
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
  fullName: '',
  phoneNumber: '',
  currentArriveAddress: '',
  currentPickupAddress: '',
  currentCarType: '4 seats',
  currentPayment: 'cash',
  rideHistory: [],
  frequentlyAddress: [{ arrive_address: '' }],
};

export function CallCenter(props: CallCenterProps) {
  const socket = useContext(WebsocketContext);
  const [token, setToken] = useState("");
  const [inputs, setInputs] = useState<User>(renderUser);
  const [incomingCallPhone, setIncomingCallPhone] = useState("");
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

  useEffect(() => {
    socket.on("newIncomingCall", (phoneNumber) => {
      setInputs({ ...inputs, phoneNumber });
    });

    return () => {
      socket.off("newIncomingCall");
    };
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
      dispatcher_id: "clafa2vz90000m1rnf6fll234",
      arrive_address: inputs.currentArriveAddress,
      pickup_address: inputs.currentPickupAddress,
      car_type: inputs.currentCarType,
      payment: inputs.currentPayment,
    };

    const reponse = await fetch(`http://localhost:3000/api/ride`, {
      method: 'POST',
      body: JSON.stringify(currentRide),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    // if (reponse.status == 201) {
    //   const customer_phone = '+84919396158';
    //   const reponse = await fetch(
    //     `http://localhost:3000/api/${customer_phone}/sms`,
    //     {
    //       method: "GET",
    //       headers: {
    //         "Content-Type": "application/json",
    //         Authorization: `Bearer ${token}`,
    //       },
    //     }
    //   );
    //   console.log('sms result: ', reponse);
    // }
  };

  const assignDriver = async () => {
    const pickupAddress = inputs.currentPickupAddress;
    const reponse = await fetch(
      `http://localhost:3000/api/${pickupAddress}/assign`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
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
      priority: 'high',
      notification: {
        body: 'Got Ride!',
      },
    };

    const response = await fetch(`https://fcm.googleapis.com/fcm/send`, {
      method: 'POST',
      body: JSON.stringify(notificationBody),
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'key=AAAAFQ7SrF0:APA91bGQ5VhXQCBMndX_4uytFVycZzuZ641kCjNg7IJCjLA7x9RUmprDAvQZomRLrZzhuQawy2o-HaT3h2yxaySpgPnDUF1FdWMrsVKoDuMKlThlM9LG6IxI96MnEDY9j5xP0gsdL3NQ',
      },
    });
    console.log(driver);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    createRide();
    //assignDriver();
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
    const goongHost = 'https://rsapi.goong.io';
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
    setInputs((input) => ({ ...input, phoneNumber: '01231231238' }));
  };

  const handleLogout = () => {
    localStorage.setItem('token', '');
    window.location.href = '/';
  };

  useEffect(() => {
    if (inputs.phoneNumber?.length >= 9) {
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
    const token = localStorage.getItem('token');
    setToken(token);
  }, []);

  const onJoinRoom = () => {
    socket.emit("JOIN_ROOM");
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Booking Now</h2>
        <div>
          <span>Hello Dispatcher!</span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
      <div className={styles.content}>
        <form onSubmit={handleSubmit}>
          <div>
            <div className={styles.flex}>
              <div className={styles.client}>
                <h4>Client Info</h4>
                <input
                  placeholder="Name"
                  type="text"
                  name="fullName"
                  value={inputs?.fullName || ''}
                  onChange={handleChange}
                  required
                />

                <input
                  placeholder="Phone number"
                  type="text"
                  name="phoneNumber"
                  value={inputs?.phoneNumber || ''}
                  onChange={handleNumberChange}
                  required
                />

                <input
                  placeholder="Arrive Address"
                  type="text"
                  name="currentArriveAddress"
                  value={inputs?.currentArriveAddress || ''}
                  onChange={handleChange}
                  required
                />
                <input
                  placeholder="Pickup Address"
                  type="text"
                  name="currentPickupAddress"
                  value={inputs?.currentPickupAddress || ''}
                  onChange={handleChange}
                  required
                />
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
                <select
                  name="currentPayment"
                  value={inputs?.currentPayment}
                  onChange={handleSelectChange}
                  required
                >
                  <option value="cash">Cash</option>
                  <option value="card">Card</option>
                </select>
                <div>
                  <input type="submit" value={'Assign Driver'} />
                </div>
              </div>
              <div className={styles.history}>
                <h4>Latest Rides</h4>
                <table>
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

                <h4>Frequently booking destinations</h4>
                <table>
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
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CallCenter;
