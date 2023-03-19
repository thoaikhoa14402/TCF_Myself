import React from "react";
import styles from "./CartItem.module.css";
import bacxiu from "../../../../assets/image/products/1/1.1.4.jpg";
import { ReactComponent as AddButton } from "../../../../assets/svg/productPage/increaseBtn.svg";
import { ReactComponent as DecreaseButton } from "../../../../assets/svg/productPage/decreaseBtn.svg";
import { useSelector, useDispatch } from "react-redux";
import shoppingCartSlice, {
  setProductDetails,
  increaseQuantityAndPrice,
  decreaseQuantityAndPrice,
  addToCart,
} from "../../../../store/reducers/shoppingCartSlice";

function CartItem() {
  const shoppingCartData = useSelector((state) => state.shoppingCart);
  const dispatch = useDispatch();
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {shoppingCartData.products.map((productEl, index) => (
          <div className={styles.product} key={index}>
            <span className={styles.quantity}>x {productEl.quantity}</span>
            <div className={styles["product-img"]}>
              <img src={productEl.img}></img>
            </div>
            <div className={styles["product-info"]}>
              <span className={styles["product-name"]}>{productEl.name}</span>
              <span className={styles["product-price"]}>{productEl.price}</span>
            </div>
            <button
              className={styles["add-btn"]}
              onClick={() => {
                dispatch(increaseQuantityAndPrice({ id: index }));
              }}
            >
              <AddButton className={styles["add-icon"]} />
            </button>
            <button
              className={styles["decrease-btn"]}
              onClick={() => {
                dispatch(decreaseQuantityAndPrice({ id: index }));
              }}
            >
              <DecreaseButton className={styles["decrease-icon"]} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CartItem;
