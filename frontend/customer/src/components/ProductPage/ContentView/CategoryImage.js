import React from "react";
import styles from "./CategoryImage.module.css";

import coffee_banner from "../../../assets/image/carousel/slider2.png";
import ice_blended_banner from "../../../assets/image/carousel/slider3.png";
import tea_banner from "../../../assets/image/carousel/slider4.jpg";
import soda_mojito_banner from "../../../assets/image/carousel/slider5.jpg";
import cake_banner from "../../../assets/image/carousel/slider1.png";

function CategoryImage(props) {
  if (props.data.length === 1 && props.data[0].slug === "ice-blended")
    return (
      <img
        src={ice_blended_banner}
        alt="product-banner"
        className={styles["category-img"]}
      />
    );
  else if (props.data.length === 1 && props.data[0].slug === "tea")
    return (
      <img
        src={tea_banner}
        alt="product-banner"
        style={{ width: "100%" }}
      ></img>
    );
  else if (props.data.length === 1 && props.data[0].slug === "soda-mojito")
    return (
      <img
        src={soda_mojito_banner}
        alt="product-banner"
        style={{ width: "100%" }}
      ></img>
    );
  else if (props.data.length === 1 && props.data[0].slug === "tcf-cake")
    return (
      <img
        src={cake_banner}
        alt="product-banner"
        className={styles["category-img"]}
      ></img>
    );
  else
    return (
      <img
        src={coffee_banner}
        alt="product-banner"
        className={styles["category-img"]}
      />
    );
  // if (props.slug === "coffee")
  //   return (
  //     <div>
  //       <img
  //         src={coffee_banner}
  //         alt="product-banner"
  //         className={styles["category-img"]}
  //       ></img>
  //     </div>
  //   );
  // else if (props.slug === "ice-blended") {
  //   return (
  //     <img
  //       src={ice_blended_banner}
  //       alt="product-banner"
  //       className={styles["category-img"]}
  //     />
  //   );
  // } else if (props.slug === "tea") {
  //   return (
  //     <img
  //       src={tea_banner}
  //       alt="product-banner"
  //       className={styles["category-img"]}
  //     />
  //   );
  // } else if (props.slug === "soda-mojito") {
  //   return (
  //     <img
  //       src={soda_mojito_banner}
  //       alt="product-banner"
  //       className={styles["category-img"]}
  //     />
  //   );
  // } else if (props.slug === "tcf-cake") {
  //   return (
  //     <img
  //       src={cake_banner}
  //       alt="product-banner"
  //       className={styles["category-img"]}
  //     />
  //   );
  // }
  // return (
  //   <img
  //     src={ice_blended_banner}
  //     alt="product-banner"
  //     className={styles["category-img"]}
  //   />
  // );
}

export default CategoryImage;
