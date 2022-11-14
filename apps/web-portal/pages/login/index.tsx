import { ChangeEvent, useCallback, useState } from 'react';
import styles from './index.module.css';

/* eslint-disable-next-line */
export interface LoginProps {}

export type LoginUser = {
  username: string;
  password: string;
};

export function Login(props: LoginProps) {
  const [inputs, setInputs] = useState<LoginUser>({
    username: '',
    password: '',
  });

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const name = event.target.name;
    setInputs((values) => ({
      ...values,
      [name]: value,
    }));
  }, []);

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
          window.location.href = '/call-center';
        } else {
          alert('Wrong username or password');
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className={styles['main']}>
      <h4 className={styles['sign']}>Login Form</h4>
      <form onSubmit={handleSubmit} className={styles['form1']}>
        <div>
          <div>
            <label>
              <input
                className={styles['un']}
                placeholder="Your phone number"
                type="text"
                name="username"
                value={inputs?.username || ''}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              <input
                className={styles['pass']}
                placeholder="Password"
                type="password"
                name="password"
                value={inputs?.password || ''}
                onChange={handleChange}
                required
              />
            </label>

            <div>
              <input
                className={styles['submit']}
                type="submit"
                value={'Login'}
              />
            </div>
            <p className={styles['signup']}>
              <a href="/signup">Sign Up</a>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
