import styles from "./NewProduct.module.css";
import title from "../../../assets/image/newProduct/title.png";
import pineapple from "../../../assets/image/newProduct/pineapple.jpg";
import mango from "../../../assets/image/newProduct/mango.jpg";
import bg_curve from "../../../assets/image/newProduct/bg-curve.png";
import hover_mango from "../../../assets/image/newProduct/hover_mango.png";
import hover_pineapple from "../../../assets/image/newProduct/hover_pineapple.png";
import hover_pineapple_overlay from "../../../assets/image/newProduct/hover_pineapple_overlay.png";
import hover_mango_overlay from "../../../assets/image/newProduct/hover_mango_overlay.png";

import bubble_1 from "../../../assets/image/newProduct/bubble_1.png";
import bubble_2 from "../../../assets/image/newProduct/bubble_2.png";

import { ReactComponent as RightCircle } from "../../../assets/svg/newProduct/right_circle.svg";
import { ReactComponent as LeftCircle } from "../../../assets/svg/newProduct/left_circle.svg";

const NewProduct = () => {
  return (
    <div style={{ paddingTop: "20rem", backgroundColor: "white" }}>
      {/* Left and Right Circles*/}
      <div className={styles.background}>
        <img src={title}></img>
        <div className={styles.circles}>
          <LeftCircle />
          <RightCircle />
        </div>
        <div className={styles.products}>
          {/* Pineapple */}
          <div className={styles.product}>
            <div>
              <div className={styles["product-overlay"]}></div>
              <img src={pineapple} alt="pineapple" />
              <img
                className={styles["hover-pineapple-overlay"]}
                src={hover_pineapple_overlay}
                alt="pineapple"
              />
              <img
                src={hover_pineapple}
                alt="pineapple"
                className={styles["hover_pineapple"]}
              />
              <img src={bubble_1} className={styles.bubble_1} />
            </div>

            <p className={styles.description}>
              Sự hòa nguyện từ vị thanh Trà Oloong, mùi ngọt dịu của Thơm, và
              dai giòn của Trân Châu Trắng đập tan đi cái nóng khắc nghiệt của
              mùa hè. Hứa hẹn sẽ mang cho bạn làn gió mát.
            </p>
            <button>Xem Thêm</button>
          </div>
          {/* Mango  */}
          <div className={styles.product}>
            <div>
              <div className={styles["product-overlay"]}></div>
              <img src={mango} alt="mango" />
              <img
                className={styles["hover-mango-overlay"]}
                src={hover_mango_overlay}
                alt="mango"
              />
              <img
                src={hover_mango}
                className={styles["hover_mango"]}
                alt="mango"
              />
              <img src={bubble_2} className={styles.bubble_2} />
            </div>

            <p className={styles.description}>
              Sự hòa nguyện từ Trà Oloong, vị ngọt ngây ngất của Xoài, và dai
              giòn của Trân Châu Trắng đập tan đi cái nóng khắc nghiệt của mùa
              hè. Hứa hẹn sẽ mang tới cho bạn làn gió mát.
            </p>
            <button>Xem Thêm</button>
          </div>
        </div>
        {/* background images: yello and white curve */}
        <img className={styles["background_curve"]} src={bg_curve} />
      </div>
    </div>
  );
};

export default NewProduct;
