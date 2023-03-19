import React from "react";
import MyCart from "./MyCart";
import CartItem from "./CartItem";
import TotalBill from "./TotalBill";
import Note from "./Note";
import styles from "./Cart.module.css";

function Cart() {
  return (
    <div className={styles.container}>
      <MyCart />
      <TotalBill />
      <Note />
    </div>
  );
}

export default Cart;
