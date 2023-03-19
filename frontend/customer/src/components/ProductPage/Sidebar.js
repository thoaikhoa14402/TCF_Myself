import React from "react";
import styles from "./Sidebar.module.css";
import { Link, NavLink, useNavigate } from "react-router-dom";

const productTypes = [
  {
    title: "Cà Phê",
    slug: "coffee",
    types: ["Cà Phê Việt", "Cà Phê Ý"],
  },
  {
    title: "Đá Xay",
    slug: "ice-blended",
    types: ["Đá Xay", "Yogurt Đá Xay"],
  },
  {
    title: "Trà",
    slug: "tea",
    types: ["Trà", "Trà Sữa", "Trà Kem Muối"],
  },
  { title: "Soda & Mojito", slug: "soda-mojito", types: [] },
  { title: "Matcha", slug: "matcha", types: [] },
  { title: "Món khác", slug: "others", types: ["Detox", "Nước Ep", "Cacao"] },
  {
    title: "TCF Cake",
    slug: "tcf-cake",
    types: ["Bánh Mì", "Bánh Ngọt", "Cheesecake & Tiramisu", "Flan & Yogurt"],
  },
];

export default function Sidebar(props) {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <div className={styles["side-bar"]}>
        {productTypes.map((el, index) => {
          return (
            <NavLink
              key={index}
              style={({ isActive }) => ({
                color: isActive ? "red" : "black",
              })}
              to={`/products-page/${el.slug}`}
            >
              <b className={styles.title}>{el.title}</b>
              {el.types.map((el_child) => (
                <span
                  className={styles["product-type"]}
                  key={Math.random() * 10}
                >
                  {el_child}
                </span>
              ))}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}
