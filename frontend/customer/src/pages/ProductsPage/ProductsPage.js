import Sidebar from "../../components/ProductPage/Sidebar";
import ContentView from "../../components/ProductPage/ContentView/ContentView";
import ShoppingCart from "../../components/ProductPage/ShoppingCart/ShoppingCart";
import CartAdding from "../../components/ProductPage/ContentView/CartAdding";
import styles from "./ProductsPage.module.css";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setProductDetails } from "../../store/reducers/shoppingCartSlice";
import AxiosClient from "../../utilities/AxiosClient";
import { useQuery } from "react-query";

const Products = [
  {
    category: "Cà Phê",
    slug: "coffee",
    proType: [
      {
        title: "Cà Phê Việt",
        products: [
          {
            name: "Cà Phê Hạt Dẻ",
            price: "52.000đ",
            img: "",
            topping: [
              {
                name: "",
                toppingPrice: "",
              },
            ],
          },
          {
            name: "Bạc Xỉu",
            price: "39.000đ",
            img: "",
            topping: [
              {
                name: "",
                toppingPrice: "",
              },
            ],
          },
          {
            name: "Bạc Xỉu Hạt Dẻ",
            price: "39.000đ",
            img: "",
            topping: [
              {
                name: "",
                toppingPrice: "",
              },
            ],
          },
          {
            name: "Bạc Xỉu Bạc Hà",
            price: "39.000đ",
            img: "",
            topping: [
              {
                name: "",
                toppingPrice: "",
              },
            ],
          },
        ],
      },
      {
        title: "Cà Phê Ý",
        products: [
          {
            name: "Espresso",
            price: "25.000đ",
            img: "",
            topping: [
              {
                name: "",
                toppingPrice: "",
              },
            ],
          },
          {
            name: "Americano",
            price: "33.000đ",
            img: "",
            topping: [
              {
                name: "",
                toppingPrice: "",
              },
            ],
          },
          {
            name: "Mocha",
            price: "36.000đ",
            img: "",
            topping: [
              {
                name: "Hương Vani",
                toppingPrice: "10.000đ",
              },
              {
                name: "Hương Hạt Dẻ",
                toppingPrice: "10.000đ",
              },
            ],
          },
          {
            name: "Caramel Macchiato",
            price: "47.000đ",
            img: "",
            topping: [
              {
                name: "",
                toppingPrice: "",
              },
            ],
          },
          {
            name: "Macchiato",
            price: "28.000đ",
            img: "",
            topping: [
              {
                name: "",
                toppingPrice: "",
              },
            ],
          },
          {
            name: "Cappuccino",
            price: "36.000đ",
            img: "",
            topping: [
              {
                name: "",
                toppingPrice: "",
              },
            ],
          },
          {
            name: "Café Latte",
            price: "36.000đ",
            img: "",
            topping: [
              {
                name: "Hương Vani",
                toppingPrice: "10.000đ",
              },
              {
                name: "Hương Hạt Dẻ",
                toppingPrice: "10.000đ",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    category: "Đá Xay",
    slug: "ice-blended",
    proType: [
      {
        title: "Đá Xay",
        products: [
          {
            name: "Caramel",
            price: "45.000đ",
            img: "",
            topping: [
              {
                name: "",
                toppingPrice: "",
              },
            ],
          },
          {
            name: "Vanila",
            price: "45.000đ",
            img: "",
            topping: [
              {
                name: "",
                toppingPrice: "",
              },
            ],
          },
          {
            name: "Mocha",
            price: "45.000đ",
            img: "",
            topping: [
              {
                name: "",
                toppingPrice: "",
              },
            ],
          },
          {
            name: "Socola",
            price: "45.000đ",
            img: "",
            topping: [
              {
                name: "",
                toppingPrice: "",
              },
            ],
          },
          {
            name: "Oreo Cookie",
            price: "52.000đ",
            img: "",
            topping: [
              {
                name: "",
                toppingPrice: "",
              },
            ],
          },
          {
            name: "Chocolate Caramel",
            price: "52.000đ",
            img: "",
            topping: [
              {
                name: "",
                toppingPrice: "",
              },
            ],
          },
          {
            name: "Chocolate Mint",
            price: "52.000đ",
            img: "",
            topping: [
              {
                name: "",
                toppingPrice: "",
              },
            ],
          },
          {
            name: "Chanh Đá Xay",
            price: "39.000đ",
            img: "",
            topping: [
              {
                name: "",
                toppingPrice: "",
              },
            ],
          },
          {
            name: "Cacao Đá Xay",
            price: "59.000đ",
            img: "",
            topping: [
              {
                name: "",
                toppingPrice: "",
              },
            ],
          },
          {
            name: "Christmas Pie",
            price: "45.000đ",
            img: "",
            topping: [
              {
                name: "",
                toppingPrice: "",
              },
            ],
          },
        ],
      },
      {
        title: "Yogurt Đá Xay",
        products: [
          {
            name: "Dâu",
            price: "49.000đ",
            img: "",
            topping: [
              {
                name: "",
                toppingPrice: "",
              },
            ],
          },
          {
            name: "Dâu Việt Quất",
            price: "49.000đ",
            img: "",
            topping: [
              {
                name: "",
                toppingPrice: "",
              },
            ],
          },
          {
            name: "Việt Quất",
            price: "49.000đ",
            img: "",
            topping: [
              {
                name: "",
                toppingPrice: "",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    category: "Trà",
    slug: "tea",
    proType: [
      {
        title: "Trà",
        products: [
          {
            name: "Trà Oloong Xoài",
            price: "42.000đ",
            img: "",
            topping: [
              {
                name: "Trân Châu Trắng",
                toppingPrice: "7.000đ",
              },
              {
                name: "Thạch Cà Phê",
                toppingPrice: "7.000đ",
              },
            ],
          },
          {
            name: "Trà Oloong Thơm",
            price: "42.000đ",
            img: "",
            topping: [
              {
                name: "Trân Châu Trắng",
                toppingPrice: "7.000đ",
              },
              {
                name: "Thạch Cà Phê",
                toppingPrice: "7.000đ",
              },
            ],
          },
          {
            name: "Trà Hibicus Lựu Đỏ",
            price: "42.000đ",
            img: "",
            topping: [
              {
                name: "Trân Châu Trắng",
                toppingPrice: "7.000đ",
              },
              {
                name: "Thạch Cà Phê",
                toppingPrice: "7.000đ",
              },
            ],
          },
          {
            name: "Trà Dưa Hấu Vải",
            price: "42.000đ",
            img: "",
            topping: [
              {
                name: "Trân Châu Trắng",
                toppingPrice: "7.000đ",
              },
              {
                name: "Thạch Cà Phê",
                toppingPrice: "7.000đ",
              },
            ],
          },
          {
            name: "Trà Đào",
            price: "42.000đ",
            img: "",
            topping: [
              {
                name: "Trân Châu Trắng",
                toppingPrice: "7.000đ",
              },
              {
                name: "Thạch Cà Phê",
                toppingPrice: "7.000đ",
              },
            ],
          },
          {
            name: "Trà Táo",
            price: "42.000đ",
            img: "",
            topping: [
              {
                name: "Trân Châu Trắng",
                toppingPrice: "7.000đ",
              },
              {
                name: "Thạch Cà Phê",
                toppingPrice: "7.000đ",
              },
            ],
          },
          {
            name: "Trà Vải",
            price: "42.000đ",
            img: "",
            topping: [
              {
                name: "Trân Châu Trắng",
                toppingPrice: "7.000đ",
              },
              {
                name: "Thạch Cà Phê",
                toppingPrice: "7.000đ",
              },
            ],
          },
          {
            name: "Trà Nha Đam Vải",
            price: "42.000đ",
            img: "",
            topping: [
              {
                name: "Trân Châu Trắng",
                toppingPrice: "7.000đ",
              },
              {
                name: "Thạch Cà Phê",
                toppingPrice: "7.000đ",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    category: "Soda & Mojito",
    slug: "soda-mojito",
    proType: [
      {
        title: "Soda",
        products: [
          {
            name: "Sunset",
            price: "49.000đ",
            img: "",
            topping: [],
          },
          {
            name: "Purple",
            price: "49.000đ",
            img: "",
            topping: [],
          },
          {
            name: "Chanh",
            price: "49.000đ",
            img: "",
            topping: [],
          },
          {
            name: "Bluesky",
            price: "49.000đ",
            img: "",
            topping: [],
          },
          {
            name: "Blueberry",
            price: "49.000đ",
            img: "",
            topping: [],
          },
        ],
      },
      {
        title: "Mojito",
        products: [
          {
            name: "Mojito Vải",
            price: "42.000đ",
            img: "",
            topping: [],
          },
          {
            name: "Mojito Đào",
            price: "42.000đ",
            img: "",
            topping: [],
          },
          {
            name: "Mojito Chanh Dây",
            price: "42.000đ",
            img: "",
            topping: [],
          },
          {
            name: "Mojito Dâu",
            price: "42.000đ",
            img: "",
            topping: [],
          },
        ],
      },
    ],
  },
  {
    category: "Matcha",
    slug: "matcha",
    proType: [],
  },
  {
    category: "Món Khác",
    slug: "others",
    proType: [],
  },
  {
    category: "TCF Cake",
    slug: "tcf-cake",
    proType: [
      {
        title: "Bánh Mì",
        products: [
          {
            name: "Bánh Mì Thịt Nguội Phô Mai",
            price: "39.000đ",
            img: "",
            topping: [],
          },
          {
            name: "Bánh Mì Kẹp Cá Ngừ",
            price: "42.000đ",
            img: "",
            topping: [],
          },
        ],
      },
      {
        title: "Bánh Ngọt",
        products: [
          {
            name: "Bánh Bắp",
            price: "20.000đ",
            img: "",
            topping: [],
          },
          {
            name: "Bánh Chuối",
            price: "20.000đ",
            img: "",
            topping: [],
          },
        ],
      },
      {
        title: "Cheesecake",
        products: [
          {
            name: "Passion Cheesecake",
            price: "29.000đ",
            img: "",
            topping: [],
          },
          {
            name: "Japanese Cheesecake",
            price: "29.000đ",
            img: "",
            topping: [],
          },
          {
            name: "Chocomint Cake",
            price: "29.000đ",
            img: "",
            topping: [],
          },
          {
            name: "Opera Cake",
            price: "29.000đ",
            img: "",
            topping: [],
          },
          {
            name: "Blueberry Cheesecake",
            price: "29.000đ",
            img: "",
            topping: [],
          },
          {
            name: "Oreo Cheesecake",
            price: "29.000đ",
            img: "",
            topping: [],
          },
          {
            name: "Matcha Cheesecake",
            price: "29.000đ",
            img: "",
            topping: [],
          },
          {
            name: "Tiramisu",
            price: "29.000đ",
            img: "",
            topping: [],
          },
        ],
      },
      {
        title: "Flan & Yogurt",
        products: [
          {
            name: "Flan Gateau",
            price: "29.000đ",
            img: "",
            topping: [],
          },
          {
            name: "Flan Caramel",
            price: "20.000đ",
            img: "",
            topping: [],
          },
          {
            name: "Yogurt Nếp Cẩm",
            price: "20.000đ",
            img: "",
            topping: [],
          },
          {
            name: "Yogurt",
            price: "15.000đ",
            img: "",
            topping: [],
          },
        ],
      },
    ],
  },
];

const FETCH_PRODUCT_URL = "/tcf/v1/products/get-products";

const fetchProductsData = async () => {
  try {
    const response = await AxiosClient.get(FETCH_PRODUCT_URL);
    if (response.status === "success") {
      return response.data;
    }
  } catch (err) {
    console.log("err roi");
  }
};

const ProductsPage = () => {
  const { isLoading, data, isError, error } = useQuery(
    "products-data",
    fetchProductsData
  );
  const params = useParams();
  const shoppingCartData = useSelector((state) => state.shoppingCart);
  const dispatch = useDispatch();
  if (isLoading) return <h1>loading....</h1>;
  return (
    <div className={styles.container}>
      <Sidebar category={params.category} />
      <ContentView
        // data={
        //   params?.category
        //     ? Products.filter((el) => el.slug === params.category)
        //     : Products
        // }

        data={
          params?.category
            ? data.filter((el) => el.slug === params.category)
            : data
        }
      />
      <ShoppingCart />
      {/* overlay testing */}
      {shoppingCartData.productDetails.name && (
        <>
          <div
            className={styles.overlay}
            onClick={() => {
              dispatch(setProductDetails({}));
            }}
          />
          <CartAdding
            name={shoppingCartData.productDetails.name}
            price={shoppingCartData.productDetails.price}
            totalPrice={shoppingCartData.productDetails.totalPrice}
            img={shoppingCartData.productDetails.img}
            quantity={shoppingCartData.productDetails.quantity}
            note={shoppingCartData.productDetails.note}
          />
        </>
      )}
    </div>
  );
};

export default ProductsPage;
