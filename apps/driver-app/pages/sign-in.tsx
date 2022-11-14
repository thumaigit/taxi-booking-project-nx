import { useSignInMutation } from "@@store/api";
import { setDriver } from "@@store/appSlice";
import { Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const SignIn = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [signIn, { isSuccess, data, isError }] = useSignInMutation();
  const [form, setValues] = useState({
    phone: "",
    password: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();
    signIn(form);
  };

  const updateField = (e) => {
    setValues({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(setDriver(data));
      router.push("/dashboard");
    }
  }, [isSuccess]);

  return (
    <div className="card">
      <form>
        <h2 className="title">Car Booking</h2>

        <div className="email-login">
          <label htmlFor="phone">Số điện thoại</label>
          <input
            value={form.phone}
            type="text"
            name="phone"
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
        {isError && (
          <Typography
            sx={{
              color: "red",
              textAlign: "center",
              fontFamily: "Montserrat",
              fontSize: "14px",
            }}
          >
            Thông tin đăng nhập không chính xác
          </Typography>
        )}
        <button onClick={onSubmit} className="cta-btn">
          Đăng nhập
        </button>
        <Link className="forget-pass" href="/sign-up">
          <a className="forget-pass">Chưa có tài khoản? Đăng ký</a>
        </Link>
      </form>
    </div>
  );
};

export default SignIn;
