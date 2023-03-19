import React from "react";
import styles from "./CartAdding.module.css";
import { ReactComponent as AddButton } from "../../../assets/svg/productPage/increaseBtn.svg";
import { ReactComponent as DecreaseButton } from "../../../assets/svg/productPage/decreaseBtn.svg";
import { ReactComponent as NoteIcon } from "../../../assets/svg/productPage/noteIcon.svg";
import bacxiu from "../../../assets/image/products/1/1.1.4.jpg";
import { useSelector, useDispatch } from "react-redux";
import {useState} from "react";
import shoppingCartSlice, {
  setProductDetails,
  increaseQuantityAndPrice,
  decreaseQuantityAndPrice,
  addToCart,
} from "../../../store/reducers/shoppingCartSlice";

function CartAdding(props) {
  const [note,setNote] = useState();
  const dispatch = useDispatch();
  const shoppingCartData = useSelector((state) => state.shoppingCart)
  const handleNoteChange = (event) => {
    setNote(event.target.value);
    const currentProductDetails = shoppingCartData.productDetails;
    dispatch(setProductDetails({
      ...currentProductDetails,
      note: event.target.value}));
  }
  return (
    <div className={styles.container}>
      <div className={styles["card-adding"]}>
        {/* product image */}
        <div className={styles["product-img"]}>
          <img src={props.img}></img>
        </div>
        {/* product information */}
        <div className={styles["product-info"]}>
          <span className={styles["product-name"]}>{props.name}</span>
          <div className={styles["product-detail"]}>
            <span className={styles["product-price"]}>{props.price}</span>
            <div className={styles["product-quantity"]}>
              {/* product quantity */}
              <button
                className={styles["decrease-btn"]}
                onClick={() => dispatch(decreaseQuantityAndPrice())}
              >
                <DecreaseButton className={styles["decrease-icon"]} />
              </button>
              <span className={styles["quantity"]}>{props.quantity}</span>
              <button
                className={styles["add-btn"]}
                onClick={() => dispatch(increaseQuantityAndPrice())}
              >
                <AddButton className={styles["add-icon"]} />
              </button>
            </div>
          </div>
          {/* note section */}
          <div className={styles.note}>
            <div className={styles.title}>
              <NoteIcon className={styles["note-icon"]} />
              <span className={styles["note-title"]}>GHI CHÚ</span>
            </div>
            <div className={styles.message}>
              <textarea placeholder="Ghi chú......." value = {note} onChange = {handleNoteChange}></textarea>
            </div>
          </div>
          {/* order button */}
          <button
            className={styles["order-btn"]}
            onClick={() => {
              dispatch(addToCart());
              dispatch(setProductDetails({}));
            }}
          >
            <span>{props.totalPrice}</span>
            <span> - Thêm vào giỏ hàng</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartAdding;
