import { Outlet } from "react-router-dom";
import styles from "./AuthenLayout.module.css";

const AuthenLayout = () => {
  return (
    <div className={styles.container}>
      <div className={styles.backdrop}></div>
      <Outlet />
    </div>
  );
};

export default AuthenLayout;
