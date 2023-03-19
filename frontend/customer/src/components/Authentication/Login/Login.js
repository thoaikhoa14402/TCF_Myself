import logo from "../../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Login.module.css";
import {
  validateEmail,
  validatePassword,
} from "../../../utilities/ErrorValidation";
import useValidator from "../../../hooks/useValidator";
import AxiosClient from "../../../utilities/AxiosClient";
import { setAuth, authSelector } from "../../../store/reducers/authSlice";

const LOGIN_URL = "/tcf/v1/users/login";

const Login = () => {
  const authData = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  // input change handler
  const inputChangeHandler = (event) => {
    // console.log(data);
    setData({ ...data, [event.target.name]: event.target.value });
  };

  // error handle
  const [error, setError, UseValidatorEffect] = useValidator({
    email: "",
    password: "",
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

  // handle login form submit
  const handleLogin = async (event) => {
    event.preventDefault();
    let timer; // used for create delay time when navigate to home page if authorized successfully.
    try {
      const response = await AxiosClient.post(
        LOGIN_URL,
        { ...data },
        { withCredentials: true }
      );
      if (response.status === "success") {
        setError((prev) => ({ ...prev, email: "", password: "" }));
        dispatch(setAuth(response.data));
        timer = setTimeout(navigate("/home-page", { replace: true }), 800);
      }
    } catch (err) {
      if (err.message === "Incorrect email or password") {
        setError((prev) => ({
          ...prev,
          email: "Tài khoản hay mật khẩu của bạn không đúng.",
        }));
      }
    }
    return () => clearTimeout(timer);
  };

  console.log(authData);
  // jsx code
  return (
    // form
    <form onSubmit={handleLogin} className={styles["login-form"]}>
      <div className={styles.logo}>
        <img src={logo} alt="logo"></img>
      </div>
      <label>
        <input
          name="email"
          value={data.email}
          onChange={inputChangeHandler}
          placeholder="Nhập gmail của bạn"
          className={error.email ? styles["error"] : ""}
        />
        {/* if error occurs */}
        {error.email && (
          <span className={styles["err-msg"]}>{error.email}</span>
        )}
      </label>
      <label>
        <input
          name="password"
          type="password"
          value={data.password}
          onChange={inputChangeHandler}
          placeholder="Nhập mật khẩu của bạn"
          className={error.password ? styles["error"] : ""}
        ></input>
        {/* if error occurs */}
        {error.password && (
          <span className={styles["err-msg"]}>{error.password}</span>
        )}
      </label>
      <div
        className={styles["forgot-password"]}
        onClick={() => navigate("/account/forgot-password")}
      >
        Quên mật khẩu?
      </div>
      <button>Đăng nhập</button>
      <p>
        Bạn chưa có tài khoản?{" "}
        <span onClick={() => navigate("/account/register")}>Tạo tài khoản</span>
      </p>
    </form>
  );
};

export default Login;
