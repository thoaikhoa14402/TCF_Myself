import styles from "./Footer.module.css";
import logo from "../../assets/image/footer/logo.png";
import QR_code from "../../assets/image/footer/QR.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactComponent as ClockIcon } from "../../assets/svg/footer/clock.svg";
import { ReactComponent as PhoneIcon } from "../../assets/svg/footer/phone.svg";
import { ReactComponent as WebsiteIcon } from "../../assets/svg/footer/website.svg";
import { ReactComponent as LocationIcon } from "../../assets/svg/footer/address.svg";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";

const Footer = () => {
  return (
    <>
      <footer className={styles.container}>
        <div className={styles.information}>
          <p className={styles.title}>Thông tin</p>
          <span>
            <img src={logo} alt="logo" />
          </span>
          <div className={styles["working-time"]}>
            <ClockIcon className={styles["clock-icon"]} />
            <div>
              <span>Giờ mở cửa: 06:30</span>
              <span>Giờ đóng cửa: 23:30</span>
            </div>
          </div>
          <div className={styles["phone-number"]}>
            <PhoneIcon className={styles["phone-icon"]} />
            <span>028 6652 3777</span>
          </div>
          <div className={styles["website"]}>
            <WebsiteIcon className={styles["website-icon"]} />
            <a href="http://www.thecoffeefactory.com.vn">
              http://www.thecoffeefactory.com.vn
            </a>
          </div>
          <div className={styles["email"]}>
            {/* <EmailIcon className={styles["email-icon"]} /> */}
            <FontAwesomeIcon
              icon={faEnvelope}
              className={styles["email-icon"]}
            />
            <a href="tcfthecoffeefactory@gmail.com">
              tcfthecoffeefactory@gmail.com
            </a>
          </div>
          <div className={styles["location"]}>
            <LocationIcon className={styles["location-icon"]} />
            <span>
              456/59 Cao Thắng nối dài, Phường 12, Quận 10, Thành phố Hồ Chí
              Minh
            </span>
          </div>
        </div>
        <div className={styles.links}>
          <p className={styles.title}>Liên kết nhanh</p>
          <a href="/home-page">Trang Chủ</a>
          <a href="products-page">Sản Phẩm</a>
          <a href="/vouchers">Thông Tin Ưu Đãi</a>
          <a href="contact-us">Liên Hệ</a>
          <a href="stores">Cửa Hàng</a>
        </div>
        <div className={styles.terms}>
          <p className={styles.title}>Điều khoản</p>
          <a href="/rules">Điều kiện sử dụng</a>
          <a href="/security">Quy tắc bảo mật</a>
          <span>
            <img src={QR_code} alt="QR code"></img>
          </span>
        </div>
        <div className={styles.registration}>
          <p className={styles.title}>Đăng ký nhận bản tin</p>
          <p className={styles.description}>
            Xin vui lòng để lại địa chỉ email, chúng tôi sẽ cập nhật những thông
            tin khuyến mãi hấp dẫn tới quý khách hàng.
          </p>
          <div className={styles["registration-form"]}>
            <input placeholder="Họ và tên" className={styles.name}></input>
            <input placeholder="Email" className={styles.email}></input>
            <button>Đăng ký</button>
          </div>
        </div>
      </footer>
      {/* Copyright section  */}
      <div className={styles.copyright}>
        <div>
          © Bản quyền thuộc về
          <span>The Coffee Factory</span>
        </div>
      </div>
    </>
  );
};

export default Footer;
