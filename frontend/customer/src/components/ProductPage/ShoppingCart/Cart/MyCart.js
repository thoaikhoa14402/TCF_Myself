import React from "react";
import styles from "./MyCart.module.css";
import { ReactComponent as CartIcon } from "../../../../assets/svg/productPage/cartIcon.svg";
import CartItem from "./CartItem";

function MyCart() {
  return (
    <>
      <div className={styles.container}>
        <CartIcon className={styles["cart-icon"]} />
        <span className={styles["title"]}>GIỎ HÀNG CỦA BẠN</span>
      </div>
      <CartItem />
    </>
  );
}

export default MyCart;
