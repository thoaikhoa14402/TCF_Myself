import styles from "./ForgotPassword.module.css";
import logo from "../../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAuth } from "../../../store/reducers/authSlice";
import { ReactComponent as BackArrowIcon } from "../../../assets/svg/backArrow.svg";
import { validateEmail } from "../../../utilities/ErrorValidation";
import useValidator from "../../../hooks/useValidator";
import AxiosClient from "../.././../utilities/AxiosClient";

const FORGOT_PASSWORD_URL = "/tcf/v1/users/forgotPassword";

const ForgotPassword = (props) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const authData = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const inputChangeHandler = (event) => {
    setEmail(event.target.value);
    console.log("error state: ", error);
  };

  // error handle
  const [error, setError, UseValidatorEffect] = useValidator({
    email: "",
  });

  UseValidatorEffect(
    {
      type: "email",
      payload: { data: email, message: "Gmail của bạn không hợp lệ." },
    },
    (data) => validateEmail.test(data),
    [email]
  );

  // handle forgot password
  const handleForgotPassword = async (event) => {
    event.preventDefault();
    try {
      const response = await AxiosClient.post(
        FORGOT_PASSWORD_URL,
        { email: email },
        { withCredentials: true }
      );
      if (response.status === "success") {
        console.log("response in forgot password: ", response);
        dispatch(setAuth({ ...response.data, email: email }));
        props.isInputEmail(true);
      }
    } catch (err) {
      console.error(err);
      if (err.message === "There is no user with that email address.") {
        setError((prev) => ({ ...prev, email: "Email này không tồn tại." }));
        props.isInputEmail(false);
      }
    }
  };

  // jsx code
  return (
    // form
    <form
      onSubmit={handleForgotPassword}
      className={styles["forgot-pass-form"]}
    >
      <div className={styles.logo}>
        <img src={logo} alt="logo"></img>
      </div>
      <label>
        <input
          name="email"
          value={email}
          onChange={inputChangeHandler}
          placeholder="Nhập gmail của bạn"
          className={error.email ? styles["error"] : ""}
        />
        {/* if error occurs */}
        {error.email && (
          <span className={styles["err-msg"]}>{error.email}</span>
        )}
      </label>

      <button
        className={styles["confirm-btn"]}
        //onClick={() => navigate("/account/confirm-letter")}
      >
        Xác nhận
      </button>
      <div className={styles["submit-btn"]}>
        <span
          className={styles["register-btn"]}
          onClick={() => navigate("/account/register")}
        >
          Đăng ký
        </span>
        <span
          className={styles["login-btn"]}
          onClick={() => navigate("/account/login")}
        >
          Đăng nhập
        </span>
      </div>
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

export default ForgotPassword;
