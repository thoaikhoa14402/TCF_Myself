import React from "react";
import styles from "./ShoppingCart.module.css";
import { ReactComponent as MagnifyingGlass } from "../../../assets/svg/productPage/magnifyingGlass.svg";
import {useNavigate} from "react-router-dom"
import SearchForm from "./SearchForm";
import Cart from "./Cart/Cart";

function ShoppingCart() {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <SearchForm />
      <Cart />
      {/* order button */}
      <button className={styles["order-btn"]} onClick = {() => {navigate('/payment-page')}}>Thanh Toán</button>
    </div>
  );
}

export default ShoppingCart;
