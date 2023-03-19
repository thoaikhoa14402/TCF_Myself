import styles from "./Information.module.css";
import { ReactComponent as LeftCoffeeBean } from "../../../assets/svg/information/left_coffee_bean.svg";
import { ReactComponent as RightCoffeeBean } from "../../../assets/svg/information/right_coffee_bean.svg";
import { ReactComponent as LeftCoffeePlant } from "../../../assets/svg/information/left_coffee_plant.svg";
import { ReactComponent as RightCoffeePlant } from "../../../assets/svg/information/right_coffee_plant.svg";
import information from "../../../assets/image/information/information.png";

const Information = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>GIỚI THIỆU</div>
      {/* Coffee Bean Icon */}
      <div className={styles["coffee-beans"]}>
        <LeftCoffeeBean />
        <RightCoffeeBean />
      </div>
      {/* Coffee Plants Icon */}
      <div className={styles["coffee-plants"]}>
        <LeftCoffeePlant />
        <RightCoffeePlant />
      </div>
      <div className={styles.description}>
        <div>The Coffee Factory</div>
        <div>Chuỗi cà phê rang tươi đầu tiên tại Việt Nam</div>
      </div>
      <div className={styles.content}>
        <div>
          Tháng 11/2013, cửa hàng The Coffee Factory đầu tiên bắt đầu hoạt động
          ngay mặt tiền đường Trương Định, TP.HCM
        </div>
        <div>
          với phong cách khá lạ mắt: tất cả máy rang, xay cà phê, bàn ghế, ống
          nước cùng được bố trí trong một không gian nhỏ thoáng đãng.
        </div>
      </div>
      <button style={{ letterSpacing: "0.1rem" }}>Xem thêm</button>
      <img
        src={information}
        alt="intro-image"
        style={{ width: "100%", marginTop: "3rem" }}
      ></img>
    </div>
  );
};

export default Information;
