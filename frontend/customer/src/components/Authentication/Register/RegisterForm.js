import styles from "./RegisterForm.module.css";
import logo from "../../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef, useMemo } from "react";
import { ReactComponent as BackArrowIcon } from "../../../assets/svg/backArrow.svg";
import { ReactComponent as ErrorIcon } from "../../../assets/svg/errorBtn.svg";
import {
  validateEmail,
  validatePassword,
  validatePasswordConfirm,
} from "../../../utilities/ErrorValidation";
import useValidator from "../../../hooks/useValidator";
import AxiosClient from "../../../utilities/AxiosClient";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../../../store/reducers/authSlice";
import { clear } from "@testing-library/user-event/dist/clear";

const REGISTER_URL = "/tcf/v1/users/signup";

const RegisterForm = (props) => {
  const authData = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
  });

  // input change handler
  const inputChangeHandler = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };
  // error handle
  const [error, setError, UseValidatorEffect] = useValidator({
    email: "",
    password: "",
    passwordConfirm: "",
  });
  // email validator
  UseValidatorEffect(
    {
      type: "email",
      payload: { data: data.email, message: "Gmail của bạn không hợp lệ." },
    },
    (data) => validateEmail.test(data),
    [data.email]
  );

  // password validator
  UseValidatorEffect(
    {
      type: "password",
      payload: {
        data: data.password,
        message: "Mật khẩu phải tối thiểu 8 kí tự.",
      },
    },
    (data) => validatePassword(data),
    [data.password]
  );

  // password confirm validator
  UseValidatorEffect(
    {
      type: "passwordConfirm",
      payload: {
        data: {
          password: data.password,
          passwordConfirm: data.passwordConfirm,
        },
        message: "Mật khẩu của bạn không trùng khớp.",
      },
    },
    (data) => validatePasswordConfirm(data.password, data.passwordConfirm),
    [data.passwordConfirm]
  );

  // handle register form
  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      const response = await AxiosClient.post(
        REGISTER_URL,
        { ...data },
        { withCredentials: true }
      );
      console.log("response in register handle: ", response);
      if (response.status === "success") {
        setError((prev) => ({
          ...prev,
          email: "",
          password: "",
          passwordConfirm: "",
        }));
        dispatch(setAuth(response.data));
        props.isRegistered(true);
      }
    } catch (err) {
      if (err.message === "Invalid input data. Password are not the same")
        setError((prev) => ({
          ...prev,
          passwordConfirm: "Mật khẩu của bạn không trùng khớp.",
        }));
      else if (err.message.includes("Duplicate field value")) {
        setError((prev) => ({ ...prev, email: "Email đã được sử dụng." }));
      } else if (err.message === "Email and password are required.") {
        setError((prev) => ({
          ...prev,
          email: "Vui lòng nhập email của bạn.",
          password: "Vui lòng nhập mật khẩu của bạn.",
        }));
      }
      props.isRegistered(false);
    }
  };
  return (
    <form onSubmit={handleRegister} className={styles["register-form"]}>
      <div className={styles.logo}>
        <img src={logo} alt="logo"></img>
      </div>
      {/* email */}
      <label>
        <input
          name="email"
          value={data.email}
          onChange={inputChangeHandler}
          placeholder="Nhập gmail của bạn"
          className={error.email ? styles["error"] : ""}
        ></input>
        {/* if error occurs */}
        {error.email && (
          <span className={styles["err-msg"]}>{error.email}</span>
        )}
        {error.email && <ErrorIcon className={styles["err-icon"]} />}
      </label>
      {/* password */}
      <label>
        <input
          name="password"
          onChange={inputChangeHandler}
          type="password"
          value={data.password}
          placeholder="Nhập mật khẩu của bạn"
          className={error.password ? styles["error"] : ""}
        ></input>
        {/* if error occurs */}
        {error.password && (
          <span className={styles["err-msg"]}>{error.password}</span>
        )}
        {error.password && <ErrorIcon className={styles["err-icon"]} />}
      </label>
      {/* confirm password */}
      <label>
        <input
          name="passwordConfirm"
          onChange={inputChangeHandler}
          type="password"
          value={data.passwordConfirm}
          placeholder="Xác nhận mật khẩu của bạn"
          className={error.passwordConfirm ? styles["error"] : ""}
        ></input>
        {/* if error occurs */}
        {error.passwordConfirm && (
          <span className={styles["err-msg"]}>{error.passwordConfirm}</span>
        )}
        {error.passwordConfirm && <ErrorIcon className={styles["err-icon"]} />}
      </label>
      <button className={styles["register-btn"]}>Đăng ký</button>
      <p>
        Bạn đã có tài khoản?{" "}
        <span onClick={() => navigate("/account/login")}>Đăng nhập</span>
      </p>
      {/* back arrow icon */}
      <button
        type="button"
        className={styles.backArrowIcon}
        onClick={() => navigate(-1)}
      >
        <BackArrowIcon />
      </button>
    </form>
  );
};

export default RegisterForm;
