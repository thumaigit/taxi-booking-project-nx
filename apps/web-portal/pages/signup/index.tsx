import { ChangeEvent, useCallback, useState } from 'react';
import styles from './index.module.css';

/* eslint-disable-next-line */
export interface LoginProps {}

export type SignUpUser = {
  phoneNumber: string;
  password: string;
};

export function Login(props: LoginProps) {
  const [inputs, setInputs] = useState<SignUpUser>({
    phoneNumber: '',
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
      full_name: 'admin',
      phone_number: inputs.phoneNumber,
      user_password: inputs.password,
      user_type: 'admin',
    };
    await fetch(`http://localhost:3000/api/user`, {
      method: 'POST',
      body: JSON.stringify(currentUser),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.status == 201) {
          alert('Success!');
          window.location.href = '/login';
        } else {
          alert('User exit!')
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className={styles['main']}>
      <h4 className={styles['sign']}>Sign Up Form</h4>
      <form onSubmit={handleSubmit} className={styles['form1']}>
        <div>
          <div>
            <label>
              <input
                className={styles['un']}
                placeholder="Your phone number"
                type="text"
                name="phoneNumber"
                value={inputs?.phoneNumber || ''}
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
                value={'Sign Up'}
              />
            </div>
            <p className={styles['signup']}>
            <a href="/login">Sign Up</a>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
