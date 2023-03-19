import styles from "./NewPassword.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ReactComponent as BackArrowIcon } from "../../../assets/svg/backArrow.svg";
import logo from "../../../assets/logo.png";
import {
  validatePassword,
  validatePasswordConfirm,
} from "../../../utilities/ErrorValidation";
import useValidator from "../../../hooks/useValidator";
import AxiosClient from "../../../utilities/AxiosClient";
import { setAuth } from "../../../store/reducers/authSlice";
import { useSelector, useDispatch } from "react-redux";

const RESET_PASSWORD_URL = "tcf/v1/users/resetPassword";

const NewPassword = (props) => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    password: "",
    passwordConfirm: "",
  });

  const authData = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const inputChangeHandler = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  // error handle
  const [error, setError, UseValidatorEffect] = useValidator({
    password: "",
    passwordConfirm: "",
  });

  // validate password
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
  // validate password confirm
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

  // handle reset password
  const handleResetPassword = async (event) => {
    event.preventDefault();
    try {
      const response = await AxiosClient.patch(
        RESET_PASSWORD_URL,
        {
          resetPasswordToken: authData.resetPasswordToken,
          password: data.password,
          passwordConfirm: data.passwordConfirm,
        },
        { withCredentials: true }
      );
      if (response.status === "success") {
        setError((prev) => ({
          ...prev,
          password: "",
          passwordConfirm: "",
        }));
        props.isInputNewPassword(true);
      }
    } catch (err) {
      if (err.message === "Invalid input data. Password are not the same") {
        setError((prev) => ({
          ...prev,
          passwordConfirm: "Mật khẩu của bạn không trùng khớp.",
        }));
        props.isInputNewPassword(false);
      }
    }
  };
  // jsx code
  return (
    // form
    <form
      onSubmit={handleResetPassword}
      className={styles["confirm-pass-form"]}
    >
      <div className={styles.logo}>
        <img src={logo} alt="logo"></img>
      </div>
      <label>
        <input
          name="password"
          type="password"
          value={data.password}
          onChange={inputChangeHandler}
          placeholder="Mật khẩu mới"
          className={error.password ? styles["error"] : ""}
        />
        {/* if error occurs */}
        {error.password && (
          <span className={styles["err-msg"]}>{error.password}</span>
        )}
      </label>
      <label>
        <input
          name="passwordConfirm"
          type="password"
          value={data.passwordConfirm}
          onChange={inputChangeHandler}
          placeholder="Xác nhận mật khẩu"
          className={error.passwordConfirm ? styles["error"] : ""}
        ></input>
        {/* if error occurs */}
        {error.passwordConfirm && (
          <span className={styles["err-msg"]}>{error.passwordConfirm}</span>
        )}
      </label>

      <button className={styles["confirm-btn"]}>Xác nhận</button>
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

export default NewPassword;
