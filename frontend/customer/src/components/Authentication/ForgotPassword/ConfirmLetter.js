import styles from "./ConfirmLetter.module.css";
import logo from "../../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../../../store/reducers/authSlice";
import { ReactComponent as BackArrowIcon } from "../../../assets/svg/backArrow.svg";
import useValidator from "../../../hooks/useValidator";
import AxiosClient from "../../../utilities/AxiosClient";

const VERIFY_CODE_URL = "/tcf/v1/users/verifyCode";

const ConfirmLetter = (props) => {
  const [verificationCode, setVerificationCode] = useState("");
  const navigate = useNavigate();
  const inputChangeHandler = (event) => {
    setVerificationCode(event.target.value);
  };
  const authData = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  // error handle
  const [error, setError, UseValidatorEffect] = useValidator({
    verificationCode: "",
  });
  // handle confirm verification code
  const handleConfirmLetterForm = async (event) => {
    event.preventDefault();
    try {
      const response = await AxiosClient.post(
        VERIFY_CODE_URL,
        {
          email: authData.email,
          verificationCode: verificationCode,
          resetPasswordToken: authData.resetPasswordToken,
        },
        { withCredentials: true }
      );
      if (response.status === "success") {
        console.log("ok");
        setError((prev) => ({
          ...prev,
          verificationCode: "",
        }));
        dispatch(setAuth({ ...response.data, email: authData.email }));
        props.isInputVerificationCodeStep(true);
      }
    } catch (err) {
      console.error("err ne: ", err);
      if (err.message === "Invalid verification code. Please try again") {
        setError((prev) => ({
          ...prev,
          verificationCode: "Mã xác nhận không hợp lệ.",
        }));
        props.isInputVerificationCodeStep(false);
      }
    }
  };

  console.log(authData);

  return (
    // form
    <form
      onSubmit={handleConfirmLetterForm}
      className={styles["forgot-pass-form"]}
    >
      <div className={styles.logo}>
        <img src={logo} alt="logo"></img>
      </div>
      <div className={styles.message}>
        Thư xác nhận lại mật khẩu đã được chuyển đến gmail của bạn.
      </div>
      <label>
        <input
          name="verificationCode"
          value={verificationCode}
          onChange={inputChangeHandler}
          placeholder="Nhập mã xác nhận của bạn"
          className={error.verificationCode ? styles["error"] : ""}
        />
        {/* if error occurs */}
        {error.verificationCode && (
          <span className={styles["err-msg"]}>{error.verificationCode}</span>
        )}
      </label>
      <button
        className={styles["confirm-btn"]}
        //onClick={() => navigate("/account/new-password")}
      >
        Tiếp theo
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

export default ConfirmLetter;
