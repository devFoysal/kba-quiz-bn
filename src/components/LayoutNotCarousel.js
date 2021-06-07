import React from "react";
import Carousel from "./Carousel";
import Footer from "./Footer";
import Header from "./Header";
import HomeQuiz from "./HomeQuiz";

const LayoutNotCarousel = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default LayoutNotCarousel;
