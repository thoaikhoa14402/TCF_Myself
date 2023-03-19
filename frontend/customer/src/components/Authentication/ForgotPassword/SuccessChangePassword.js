import styles from "./SuccessChangePassword.module.css";
import logo from "../../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { ReactComponent as SuccessTickIcon } from "../../../assets/svg/successTick.svg";
const SuccessChangePassword = () => {
  const navigate = useNavigate();
  return (
    <form className={styles["success-register-form"]}>
      <div className={styles.logo}>
        <img src={logo} alt="logo"></img>
      </div>
      <SuccessTickIcon className={styles["success-tick-icon"]} />
      <p>Bạn đã thay đổi mật khẩu thành công! </p>
      <button
        className={styles["login-btn"]}
        onClick={() => navigate("/account/login")}
      >
        Đăng nhập ngay
      </button>
    </form>
  );
};

export default SuccessChangePassword;
