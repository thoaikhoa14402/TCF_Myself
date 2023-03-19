import styles from "./BestSelling.module.css";
import product_1 from "../../../assets/image/products/2/2.1.6.jpg";
import product_2 from "../../../assets/image/products/3/3.1.3.jpg";
import product_3 from "../../../assets/image/products/1/1.1.1.jpg";
import product_4 from "../../../assets/image/products/3/3.1.2.jpg";
import product_5 from "../../../assets/image/products/2/2.1.4.jpg";
import ProductItem from "../../ProductItem/ProductItem";

const bestSellingProducts = [
  {
    img: product_1,
    name: "Christmas Pie",
    price: "45.000đ",
  },
  {
    img: product_2,
    name: "Trà Dưa Hấu Vải",
    price: "42.000đ",
  },
  {
    img: product_3,
    name: "TCF Coffee",
    price: "45.000đ",
  },
  {
    img: product_4,
    name: "Trà Hibicus Lựu Đỏ",
    price: "42.000đ",
  },
  {
    img: product_5,
    name: "Chocolate Caramel",
    price: "52.000đ",
  },
];

const BestSelling = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>Sản phẩm bán chạy </div>
      <div className={styles.container}>
        {bestSellingProducts.map((el, index) => (
          <ProductItem
            key={index + 1}
            img={el.img}
            name={el.name}
            price={el.price}
            id={index}
          />
        ))}
      </div>
    </div>
  );
};

export default BestSelling;
