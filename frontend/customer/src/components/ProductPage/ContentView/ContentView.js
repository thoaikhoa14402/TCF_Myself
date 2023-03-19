import React from "react";
import styles from "./ContentView.module.css";
import CategoryImage from "./CategoryImage";
import ProductList from "./ProductList";

function ContentView(props) {
  return (
    <div className={styles.container}>
      <CategoryImage data={props.data} />
      <ProductList data={props.data} />
    </div>
  );
}

export default ContentView;
