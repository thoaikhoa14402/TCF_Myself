import styles from "./ProductItem.module.css";
import { ReactComponent as AddButton } from "../../assets/svg/bestSelling/add-btn.svg";
import { useSelector, useDispatch } from "react-redux";
import { setProductDetails } from "../../store/reducers/shoppingCartSlice";

const ProductItem = (props) => {
  const dispatch = useDispatch();
  return (
    <div className={styles.container}>
      <div className={styles["card-img"]}>
        <img src={props.img} alt={`product_${props.id}`} />
      </div>
      <p className={styles.name}>{props.name}</p>
      <hr />
      <p className={styles.price}>{props.price}</p>
      <button
        className={styles["add-btn"]}
        onClick={() =>
          dispatch(
            setProductDetails({
              id: props.id,
              name: props.name,
              price: props.price,
              totalPrice: props.price,
              img: props.img,
              quantity: 1,
            })
          )
        }
      >
        <AddButton />
      </button>
    </div>
  );
};

export default ProductItem;
