import React from "react";
import { ReactComponent as MoneyIcon } from "../../../../assets/svg/productPage/moneyIcon.svg";
import styles from "./TotalBill.module.css";
import { useSelector } from "react-redux";

function TotalBill() {
  const shoppingCartData = useSelector((state) => state.shoppingCart);
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <MoneyIcon className={styles["money-icon"]} />
        <span className={styles["bill-title"]}>TỔNG ĐƠN HÀNG</span>
      </div>
      <div className={styles["total-price"]}>
        <span className={styles["total-title"]}>
          {/* Tổng cộng */}
          {shoppingCartData.totalBill.length > 0 ? "Tổng cộng" : ""}
        </span>
        <span className={styles.price}>
          {shoppingCartData.totalBill !== "0đ"
            ? shoppingCartData.totalBill
            : ""}
        </span>
      </div>
    </div>
  );
}

export default TotalBill;
