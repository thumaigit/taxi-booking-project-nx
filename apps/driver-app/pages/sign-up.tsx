import Link from "next/link";
import React, { useState } from "react";

const SignIn = () => {
  const [form, setValues] = useState({
    username: "",
    password: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(JSON.stringify(form, null, 2));
  };

  const updateField = (e) => {
    setValues({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="wrapper">
      <div className="card">
        <form>
          <h2 className="title">Taxi Booking</h2>

          <div className="email-login">
            <label htmlFor="username">Tài khoản</label>
            <input
              value={form.username}
              type="text"
              name="username"
              onChange={updateField}
              required
            />
            <label htmlFor="password">Mật khẩu</label>
            <input
              value={form.password}
              type="password"
              name="password"
              onChange={updateField}
              required
            />
          </div>
          <button onClick={onSubmit} className="cta-btn">
            Đăng nhập
          </button>
          <Link className="forget-pass" href="/sign-in">
            <a className="forget-pass"> Chưa có tài khoản? Đăng ký</a>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
