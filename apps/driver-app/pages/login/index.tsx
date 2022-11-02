import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import styles from './index.module.css';
import firebase from 'firebase/compat/app';
import 'firebase/compat/messaging';
import { firebaseCloudMessaging } from '@@utils';

/* eslint-disable-next-line */
export interface LoginProps {}

export type LoginUser = {
  username: string;
  password: string;
};

export enum UserStatus {
  online = 'ONLINE',
  offline = 'OFFLINE',
}

export function Login(props: LoginProps) {
  const [inputs, setInputs] = useState<LoginUser>({
    username: '',
    password: '',
  });
  const [address, setAddress] = useState('');
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [token, setToken] = useState('');
  const [isOnline, setIsOnline] = useState(false);
  const [firebaseToken, setFirebaseToken] = useState('');
  const [notification, setNotification] = useState('');

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const name = event.target.name;
    setInputs((values) => ({
      ...values,
      [name]: value,
    }));
  }, []);

  const handleChangeAddress = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setAddress(value);
    },
    []
  );

  const updateDriverInfo = async (
    username: string,
    address: string,
    status: string,
    firebaseToken: string
  ) => {
    await fetch(
      `http://localhost:3000/api/${username}/${address}/${status}/${firebaseToken}/driver`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .catch((error) => console.log(error));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const currentUser = {
      username: inputs.username,
      password: inputs.password,
    };
    await fetch(`http://localhost:3333/api/auth/login`, {
      method: 'POST',
      body: JSON.stringify(currentUser),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.access_token) {
          localStorage.setItem('token', data.access_token);
          setToken(data.access_token);
          setIsLogin(true);
        } else {
          alert('Wrong username or password');
        }
      })
      .catch((error) => console.log(error));
  };

  const updateFirebaseToken = () => {
    setToken();

    // Event listener that listens for the push notification event in the background
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('message', (event) => {
        console.log('event for the service worker', event);
      });
    }

    // Calls the getMessage() function if the token is there
    async function setToken() {
      try {
        const firebaseToken = await firebaseCloudMessaging.init();
        if (firebaseToken) {
          setFirebaseToken(firebaseToken);
          getMessage();
        }
      } catch (error) {
        console.log(error);
      }
    }

    // Get the push notification message and triggers a toast to display it
    function getMessage() {
      const messaging = firebase.messaging();
      messaging.onMessage((message) => {
        setNotification(message?.notification.body);
      });
    }
  };

  const handleSubmitAddress = async (event) => {
    event.preventDefault();
    const value = address;
    updateDriverInfo(
      inputs.username,
      address,
      UserStatus.online,
      firebaseToken
    );
    setIsOnline(true);
    alert(value);
  };

  const handleOffline = async () => {
    updateDriverInfo(
      inputs.username,
      address,
      UserStatus.offline,
      firebaseToken
    );
    setIsOnline(false);
  };

  useEffect(() => {
    updateFirebaseToken();
  }, []);

  return (
    <div className={styles['container']}>
      {!isLogin && (
        <form onSubmit={handleSubmit} className={styles['form']}>
          <div className={styles['text-container']}>
            <div className={styles['layer']}>
              <h4>Login Form</h4>
              <label>
                <input
                  placeholder="Username or phone number"
                  type="text"
                  name="username"
                  value={inputs?.username || ''}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                <input
                  placeholder="Password"
                  type="text"
                  name="password"
                  value={inputs?.password || ''}
                  onChange={handleChange}
                  required
                />
              </label>

              <div className={styles['align-right']}>
                <input type="submit" value={'Login'} />
              </div>
            </div>
          </div>
        </form>
      )}
      {isLogin && (
        <div>
          {notification && (
            <div className={styles['align-right']}>
              <p>{notification}</p>
            </div>
          )}
          <p>Hello Driver</p>
          {isOnline && isLogin && <p>You are online!</p>}
          {!isOnline && isLogin && (
            <p>You are offline! Update your location to be online</p>
          )}
          <form onSubmit={handleSubmitAddress} className={styles['form']}>
            <div className={styles['text-container']}>
              <div className={styles['layer']}>
                <h4>Action Board</h4>
                <label>
                  <input
                    placeholder="Current Address"
                    type="text"
                    value={address || ''}
                    onChange={handleChangeAddress}
                    required
                  />
                </label>
                <div>
                  <input type="submit" value={'Update location'} />
                </div>
                <div className={styles['button']}>
                  <input
                    type="button"
                    onClick={handleOffline}
                    value={'Offline'}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Login;
