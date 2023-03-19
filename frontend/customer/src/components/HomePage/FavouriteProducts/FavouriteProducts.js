import styles from "./FavouriteProducts.module.css";
import bg_1 from "../../../assets/image/favouriteProduct/bg_1.png";
import bg_2 from "../../../assets/image/favouriteProduct/bg_2.png";
import bg_3 from "../../../assets/image/favouriteProduct/bg_3.png";
import bg_hover_1 from "../../../assets/image/favouriteProduct/bg_hover_1.png";
import bg_hover_2 from "../../../assets/image/favouriteProduct/bg_hover_2.png";
import bg_hover_3 from "../../../assets/image/favouriteProduct/bg_hover_3.png";
import FavoriteProduct_1 from "../../../assets/image/favouriteProduct/FavoriteProduct_1.png";
import FavoriteProduct_2 from "../../../assets/image/favouriteProduct/FavoriteProduct_2.png";
import FavoriteProduct_3 from "../../../assets/image/favouriteProduct/FavoriteProduct_3.png";
import FavoriteProductOverlay_1 from "../../../assets/image/favouriteProduct/FavoriteProductOverlay_1.png";
import FavoriteProductOverlay_2 from "../../../assets/image/favouriteProduct/FavoriteProductOverlay_2.png";
import FavoriteProductOverlay_3 from "../../../assets/image/favouriteProduct/FavoriteProductOverlay_3.png";

const FavouriteProducts = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>Sản phẩm yêu thích</div>
      <div className={styles.wrapper}>
        <div className={styles["product"]}>
          <img
            className={styles["background_product"]}
            src={bg_1}
            alt="background-product-1"
          />
          <img
            className={styles["fv_product_1"]}
            src={FavoriteProduct_1}
            alt="Favorite-Product-1"
          />
          <img
            className={styles["background_hover"]}
            src={bg_hover_1}
            alt="background-product-1"
          />
          <img
            className={styles["product-overlay-1"]}
            src={FavoriteProductOverlay_1}
            alt="Product-Overlay-1"
          />
        </div>
        <div className={styles["product"]}>
          <img
            className={styles["background_product"]}
            src={bg_2}
            alt="background-product-2"
          />
          <img
            className={styles["fv_product_2"]}
            src={FavoriteProduct_2}
            alt="Favorite-Product-2"
          />
          <img
            className={styles["background_hover"]}
            src={bg_hover_2}
            alt="background-product-2"
          />
          <img
            className={styles["product-overlay-2"]}
            src={FavoriteProductOverlay_2}
            alt="Product-Overlay-2"
          />
        </div>
        <div className={styles["product"]}>
          <img
            className={styles["background_product"]}
            src={bg_3}
            alt="background-product-3"
          />
          <img
            className={styles["fv_product_3"]}
            src={FavoriteProduct_3}
            alt="Favorite-Product-3"
          />
          <img
            className={styles["background_hover"]}
            src={bg_hover_3}
            alt="background-product-3"
          />
          <img
            className={styles["product-overlay-3"]}
            src={FavoriteProductOverlay_3}
            alt="Product-Overlay-3"
          />
        </div>
      </div>
    </div>
  );
};

export default FavouriteProducts;
