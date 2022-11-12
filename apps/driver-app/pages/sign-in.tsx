import Link from "next/link";
import React, { useState } from "react";

const SignIn = () => {
  const [form, setValues] = useState({
    username: "",
    password: "",
    phone: "",
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
    <div className="card">
      <form>
        <h2 className="title">Car Booking</h2>

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
          <label htmlFor="phone">Số điện thoại</label>
          <input
            value={form.phone}
            type="text"
            name="phone"
            onChange={updateField}
            required
          />
        </div>
        <button onClick={onSubmit} className="cta-btn">
          Đăng ký
        </button>
        <Link className="forget-pass" href="/sign-up">
          <a className="forget-pass">Đã có tài khoản? Đăng nhập</a>
        </Link>
      </form>
    </div>
  );
};

export default SignIn;
