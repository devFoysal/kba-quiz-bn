import React from "react";
import Carousel from "./Carousel";
import Footer from "./Footer";
import Header from "./Header";
import HomeQuiz from "./HomeQuiz";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      {/* <Carousel /> */}
      {children}
      <HomeQuiz />
      <Footer />
    </>
  );
};

export default Layout;
