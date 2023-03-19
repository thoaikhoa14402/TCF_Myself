import React from "react";
import styles from "./ShoppingCart.module.css";
import { ReactComponent as MagnifyingGlass } from "../../../assets/svg/productPage/magnifyingGlass.svg";

function SearchForm() {
  return (
    <form className={styles["search-form"]}>
      <button className={styles["find-btn"]}>
        <MagnifyingGlass className={styles["glass-icon"]} />
      </button>
      <input
        className={styles["search-input"]}
        placeholder="Tìm kiếm sản phẩm . . . . . . . ."
      ></input>
    </form>
  );
}

export default SearchForm;
