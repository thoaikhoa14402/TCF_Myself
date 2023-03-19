import React, { Suspense } from "react";
import Carousel from "../components/HomePage/Carousel/Carousel";
import Information from "../components/HomePage/Information/Information";
import NewProduct from "../components/HomePage/NewProduct/NewProduct";
import BestSelling from "../components/HomePage/BestSelling/BestSelling";
import FavouriteProducts from "../components/HomePage/FavouriteProducts/FavouriteProducts";

const HomePage = () => {
  return (
    <>
      <Carousel />
      <Information />
      <NewProduct />
      <BestSelling />
      <FavouriteProducts />
    </>
  );
};

export default HomePage;
