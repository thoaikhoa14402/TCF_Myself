import styles from "./Navbar.module.css";
import logo from "../../assets/logo.png";
import { Link, NavLink } from "react-router-dom";
import { ReactComponent as SearchIcon } from "../../assets/svg/icons/search.svg";
import { ReactComponent as CartIcon } from "../../assets/svg/icons/cart.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faRegistered,
  faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  return (
    <>
      <nav className={styles["nav-bar"]}>
        {/* Logo */}
        <div>
          <img src={logo} alt="logo" width="150px"></img>
        </div>
        {/* Links */}
        <div className={styles.links}>
          <NavLink
            to="/home-page"
            children="Trang chủ"
            style={({ isActive }) => ({
              color: isActive ? "#FF0000" : "black",
            })}
          />
          <NavLink
            to="/products-page"
            children="Sản phẩm"
            style={({ isActive }) => ({
              color: isActive ? "#FF0000" : "black",
            })}
          />
          <NavLink
            to="/vouchers"
            children="Thông tin ưu đãi"
            style={({ isActive }) => ({
              color: isActive ? "#FF0000" : "black",
            })}
          />
          <NavLink
            to="/stores"
            children="Cửa hàng"
            style={({ isActive }) => ({
              color: isActive ? "#FF0000" : "black",
            })}
          />
          <NavLink
            to="/contact-us"
            children="Liên hệ"
            style={({ isActive }) => ({
              color: isActive ? "#FF0000" : "black",
            })}
          />
        </div>
        {/* Nav footer */}
        <div className={styles["nav-footer"]}>
          <button>
            <SearchIcon />
          </button>
          <button>
            <CartIcon />
          </button>
          <Link
            to="/account/login"
            children="Đăng nhập"
            className={styles["login-btn"]}
          />
          <Link
            to="/account/register"
            children="Đăng ký"
            className={styles["register-btn"]}
          />
          {/* This code for button will be displayed when using tablet, default: display none */}
          <div className={styles["dropdown"]}>
            <label htmlFor="open-dropdown-list" className={styles.menu}>
              <FontAwesomeIcon icon={faBars} />
            </label>
            {/* display when clicking to button */}

            <input
              id="open-dropdown-list"
              className={styles["openDropdownList"]}
              type="checkbox"
            ></input>
            <div className={styles["dropdown-list"]}>
              {/* Register button */}
              <Link className={styles["dropdown-list-item"]}>
                <FontAwesomeIcon icon={faRegistered} />
                <span>Đăng ký</span>
              </Link>
              {/* Login button */}
              <Link className={styles["dropdown-list-item"]}>
                <FontAwesomeIcon icon={faRightToBracket} />
                <span>Đăng nhập</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
