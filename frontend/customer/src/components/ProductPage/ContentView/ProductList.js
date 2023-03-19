import React from "react";
import styles from "./ProductList.module.css";
import ProductItem from "../../ProductItem/ProductItem";
import CategoryImage from "./CategoryImage";
import { v4 as uuid } from "uuid";

function ProductList(props) {
  return (
    <div className={styles.container}>
      {props.data.map((categoryEl) => (
        <>
          {categoryEl.proType.map((typeEl) => (
            <>
              <span className={styles.title}>{typeEl.title}</span>
              <div className={styles["product-items"]}>
                {typeEl.products.map((productEl, index) => (
                  <ProductItem
                    name={productEl.name}
                    price={productEl.price}
                    img={productEl.img}
                  />
                ))}
              </div>
            </>
          ))}
        </>
      ))}
    </div>
  );
}

export default ProductList;
