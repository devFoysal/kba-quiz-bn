import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { useSelector, useDispatch } from "react-redux";
import { setLogout } from "../store/actions/authAction";

const Header = () => {
  const [sidebar, setSidebar] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.loggedIn);
  console.log(sidebar);
  const dispatch = useDispatch();
  const handleClick = (e) => {
    setSidebar(true);
  };
  const handleClickToggle = (e) => {
    setSidebar(false);
  };

  const handelLogout = async () => {
    await dispatch(setLogout());
    handleClickToggle();
    window.location.replace("https://quizbn.karonbangladeshamar.com/");
  };

  return (
    <>
      <header className="d-none d-lg-block">
        <div className="container">
          <div className="row justify-content-between align-items-center">
            <div className="col-lg-3">
              <a href="https://karonbangladeshamar.com/">
                <img src={logo} className="img-fluid" alt="" />
              </a>
            </div>
            <div className="col-lg-9">
              <div className="header-top-div">
                <div className="lang-social-wrap">
                  <ul className="social-icons">
                    <li>
                      <a
                        href="https://www.facebook.com/karonbangladeshamar"
                        className="icon facebook"
                      >
                        <i className="fab fa-facebook"></i>
                      </a>
                    </li>

                    <li>
                      <a
                        href="https://www.youtube.com/channel/UCQ-Teu4PihByX_jU9FTVulQ"
                        className="icon youtube"
                      >
                        <i className="fab fa-youtube"></i>
                      </a>
                    </li>
                  </ul>
                  {/* 
                  <ul className="languages">
                    <li style={{ marginRight: "15px" }}>
                      <a
                        href="https://karonbangladeshamar.com/"
                        className="language"
                      >
                        <img
                          width="25"
                          src="https://karonbangladeshamar.com/wp-content/uploads/2021/04/Flag-United-Kingdom.jpg"
                          className="flag"
                        />{" "}
                        <span>English</span>
                      </a>
                    </li>

                    <li>
                      <a
                        href="https://karonbangladeshamar.com/"
                        className="language active"
                      >
                        <img
                          width="25"
                          src="https://karonbangladeshamar.com/wp-content/uploads/2021/04/203-bangladesh_400px.jpg"
                          className="flag"
                        />{" "}
                        <span>বাংলা</span>
                      </a>
                    </li>
                  </ul> */}
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-end">
                <div className="search-div flex-1 d-flex ">
                  <input
                    type="text"
                    className="search-input-box border-0 form-control mx-1 my-1 w-100 "
                    placeholder="Search"
                  />
                  <button className="border-0 bg-transparent px-3 text-white">
                    <i className="fas fa-search"></i>
                  </button>
                </div>
                <div className="buttons-div flex-1 align-items-center">
                  <a
                    className="btn"
                    href="https://karonbangladeshamar.com/%e0%a6%86%e0%a6%ae%e0%a6%be%e0%a6%a6%e0%a7%87%e0%a6%b0-%e0%a6%95%e0%a6%a5%e0%a6%be/"
                  >
                    আমাদের কথা
                  </a>

                  <a
                    className="btn"
                    href="https://karonbangladeshamar.com/%e0%a6%af%e0%a7%8b%e0%a6%97%e0%a6%be%e0%a6%af%e0%a7%8b%e0%a6%97/"
                  >
                    যোগাযোগ
                  </a>

                  {isAuthenticated ? (
                    <button
                      onClick={(e) => dispatch(setLogout())}
                      className="btn"
                    >
                      লগ আউট
                    </button>
                  ) : (
                    <Link to="/login" className="btn">
                      লগ ইন
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navbar */}
      <section id="main-nav" className="d-none d-lg-block m-0">
        <nav className="nav">
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              data-bs-toggle="dropdown"
              href="#"
              role="button"
              aria-expanded="false"
            >
              ইতিবাচক রাজনীতির গল্প
            </a>
            <ul className="dropdown-menu">
              <li>
                <a
                  className="dropdown-item"
                  href="https://karonbangladeshamar.com/category/%e0%a6%87%e0%a6%a4%e0%a6%bf%e0%a6%ac%e0%a6%be%e0%a6%9a%e0%a6%95-%e0%a6%b0%e0%a6%be%e0%a6%9c%e0%a6%a8%e0%a7%80%e0%a6%a4%e0%a6%bf%e0%a6%b0-%e0%a6%97%e0%a6%b2%e0%a7%8d%e0%a6%aa/%e0%a6%a8%e0%a6%bf%e0%a6%ac%e0%a6%a8%e0%a7%8d%e0%a6%a7/"
                >
                  নিবন্ধ
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item"
                  href="https://karonbangladeshamar.com/category/%e0%a6%87%e0%a6%a4%e0%a6%bf%e0%a6%ac%e0%a6%be%e0%a6%9a%e0%a6%95-%e0%a6%b0%e0%a6%be%e0%a6%9c%e0%a6%a8%e0%a7%80%e0%a6%a4%e0%a6%bf%e0%a6%b0-%e0%a6%97%e0%a6%b2%e0%a7%8d%e0%a6%aa/%e0%a6%9b%e0%a6%ac%e0%a6%bf/"
                >
                  ছবি
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item"
                  href="https://karonbangladeshamar.com/category/%e0%a6%87%e0%a6%a4%e0%a6%bf%e0%a6%ac%e0%a6%be%e0%a6%9a%e0%a6%95-%e0%a6%b0%e0%a6%be%e0%a6%9c%e0%a6%a8%e0%a7%80%e0%a6%a4%e0%a6%bf%e0%a6%b0-%e0%a6%97%e0%a6%b2%e0%a7%8d%e0%a6%aa/%e0%a6%ad%e0%a6%bf%e0%a6%a1%e0%a6%bf%e0%a6%93/"
                >
                  ভিডিও
                </a>
              </li>
            </ul>
          </li>

          <li className="nav-item">
            <a
              className="nav-link"
              href="https://karonbangladeshamar.com/category/%e0%a6%95%e0%a6%a5%e0%a6%be-%e0%a6%b9%e0%a7%8b%e0%a6%95/"
            >
              কথা হোক
            </a>
          </li>

          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              data-bs-toggle="dropdown"
              href="https://karonbangladeshamar.com/category/%e0%a6%b8%e0%a6%b9%e0%a6%9c-%e0%a6%aa%e0%a6%be%e0%a6%a0/%e0%a6%a6%e0%a7%83%e0%a6%b6%e0%a7%8d%e0%a6%af-%e0%a6%97%e0%a6%b2%e0%a7%8d%e0%a6%aa-%e0%a6%b8%e0%a6%b9%e0%a6%9c-%e0%a6%aa%e0%a6%be%e0%a6%a0/"
              role="button"
              aria-expanded="false"
            >
              সহজ পাঠ
            </a>
            <ul className="dropdown-menu">
              <li>
                <a
                  className="dropdown-item"
                  href="https://karonbangladeshamar.com/category/%e0%a6%b8%e0%a6%b9%e0%a6%9c-%e0%a6%aa%e0%a6%be%e0%a6%a0/%e0%a6%a6%e0%a7%83%e0%a6%b6%e0%a7%8d%e0%a6%af-%e0%a6%97%e0%a6%b2%e0%a7%8d%e0%a6%aa-%e0%a6%b8%e0%a6%b9%e0%a6%9c-%e0%a6%aa%e0%a6%be%e0%a6%a0/"
                >
                  দৃশ্য গল্প
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item"
                  href="https://karonbangladeshamar.com/category/%e0%a6%b8%e0%a6%b9%e0%a6%9c-%e0%a6%aa%e0%a6%be%e0%a6%a0/%e0%a6%9b%e0%a6%ac%e0%a6%bf%e0%a6%b0-%e0%a6%aa%e0%a6%be%e0%a6%a0/"
                >
                  ছবির পাঠ
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item"
                  href="https://web.politicsmatters.com.bd/"
                >
                  ই-লার্নিং
                </a>
              </li>
            </ul>
          </li>

          <li className="nav-item">
            <NavLink className="nav-link" to="/">
              কুইজ
            </NavLink>
          </li>

          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              data-bs-toggle="dropdown"
              href="#"
              role="button"
              aria-expanded="false"
            >
              ক্যাম্পেইন
            </a>
            <ul className="dropdown-menu">
              <li>
                <a
                  className="dropdown-item"
                  href="https://karonbangladeshamar.com/%e0%a6%97%e0%a6%a3%e0%a6%a4%e0%a6%a8%e0%a7%8d%e0%a6%a4%e0%a7%8d%e0%a6%b0-%e0%a6%89%e0%a7%8e%e0%a6%b8%e0%a6%ac/"
                >
                  গণতন্ত্র উৎসব
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item"
                  href="https://karonbangladeshamar.com/category/%e0%a6%95%e0%a7%8d%e0%a6%af%e0%a6%be%e0%a6%ae%e0%a7%8d%e0%a6%aa%e0%a7%87%e0%a6%87%e0%a6%a8/%e0%a6%86%e0%a6%b0%e0%a7%8d%e0%a6%95%e0%a6%be%e0%a6%87%e0%a6%ad-%e0%a6%95%e0%a7%8d%e0%a6%af%e0%a6%be%e0%a6%ae%e0%a7%8d%e0%a6%aa%e0%a7%87%e0%a6%87%e0%a6%a8/"
                >
                  সম্প্রীতি উৎসব
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item"
                  href="https://www.facebook.com/NarirJoyeShobarJoy"
                >
                  নারীর জয়ে সবার জয়
                </a>
              </li>
            </ul>
          </li>
        </nav>
      </section>

      {/* Mobile version */}
      <section className="py-2 d-lg-none">
        <div className="container">
          <div className="col-12 text-center">
            <div
              onClick={handleClick}
              style={{ position: "relative", top: "40px" }}
            >
              <i
                className="fas fa-bars"
                style={{ position: "absolute", left: "0", fontSize: "25px" }}
              ></i>
            </div>
            <a href="https://karonbangladeshamar.com/">
              <img src={logo} alt="" />
            </a>
          </div>
        </div>
      </section>

      <section className={sidebar ? "mobile-menu" : "d-none"}>
        <div className="container">
          <div className="row">
            <div className="col-12 text-left">
              <button className="mb-3" onClick={handleClickToggle}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="col-12">
              <div className="form-box">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search"
                />
                <i className="fas fa-search"></i>
              </div>
            </div>
            <div className="col-12 text-center my-3">
              <div className="icon-div">
                <a
                  href="https://www.facebook.com/karonbangladeshamar"
                  target="_blank"
                  style={{ color: "#ccc" }}
                >
                  <i
                    className="fab fa-facebook-f"
                    style={{ marginRight: "10px" }}
                  ></i>
                </a>
                <a
                  href="https://www.youtube.com/channel/UCQ-Teu4PihByX_jU9FTVulQ"
                  target="_blank"
                  style={{ color: "#ccc" }}
                >
                  <i className="fab fa-youtube"></i>
                </a>
              </div>
            </div>
            <li className="nav-item dropdown">
              <a
                className=" dropdown-toggle"
                data-bs-toggle="dropdown"
                href="#"
                role="button"
                aria-expanded="false"
              >
                ইতিবাচক রাজনীতির গল্প
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a
                    className="dropdown-item"
                    href="https://karonbangladeshamar.com/category/%e0%a6%87%e0%a6%a4%e0%a6%bf%e0%a6%ac%e0%a6%be%e0%a6%9a%e0%a6%95-%e0%a6%b0%e0%a6%be%e0%a6%9c%e0%a6%a8%e0%a7%80%e0%a6%a4%e0%a6%bf%e0%a6%b0-%e0%a6%97%e0%a6%b2%e0%a7%8d%e0%a6%aa/%e0%a6%a8%e0%a6%bf%e0%a6%ac%e0%a6%a8%e0%a7%8d%e0%a6%a7/"
                  >
                    নিবন্ধ
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    href="https://karonbangladeshamar.com/category/%e0%a6%87%e0%a6%a4%e0%a6%bf%e0%a6%ac%e0%a6%be%e0%a6%9a%e0%a6%95-%e0%a6%b0%e0%a6%be%e0%a6%9c%e0%a6%a8%e0%a7%80%e0%a6%a4%e0%a6%bf%e0%a6%b0-%e0%a6%97%e0%a6%b2%e0%a7%8d%e0%a6%aa/%e0%a6%9b%e0%a6%ac%e0%a6%bf/"
                  >
                    ছবি
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    href="https://karonbangladeshamar.com/category/%e0%a6%87%e0%a6%a4%e0%a6%bf%e0%a6%ac%e0%a6%be%e0%a6%9a%e0%a6%95-%e0%a6%b0%e0%a6%be%e0%a6%9c%e0%a6%a8%e0%a7%80%e0%a6%a4%e0%a6%bf%e0%a6%b0-%e0%a6%97%e0%a6%b2%e0%a7%8d%e0%a6%aa/%e0%a6%ad%e0%a6%bf%e0%a6%a1%e0%a6%bf%e0%a6%93/"
                  >
                    ভিডিও
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <a
                className=""
                href="https://karonbangladeshamar.com/category/%e0%a6%95%e0%a6%a5%e0%a6%be-%e0%a6%b9%e0%a7%8b%e0%a6%95/"
              >
                কথা হোক
              </a>
            </li>

            <li className="nav-item dropdown">
              <a
                className=" dropdown-toggle"
                data-bs-toggle="dropdown"
                href="https://karonbangladeshamar.com/category/%e0%a6%b8%e0%a6%b9%e0%a6%9c-%e0%a6%aa%e0%a6%be%e0%a6%a0/%e0%a6%a6%e0%a7%83%e0%a6%b6%e0%a7%8d%e0%a6%af-%e0%a6%97%e0%a6%b2%e0%a7%8d%e0%a6%aa-%e0%a6%b8%e0%a6%b9%e0%a6%9c-%e0%a6%aa%e0%a6%be%e0%a6%a0/"
                role="button"
                aria-expanded="false"
              >
                সহজ পাঠ
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a
                    className="dropdown-item"
                    href="https://karonbangladeshamar.com/category/%e0%a6%b8%e0%a6%b9%e0%a6%9c-%e0%a6%aa%e0%a6%be%e0%a6%a0/%e0%a6%a6%e0%a7%83%e0%a6%b6%e0%a7%8d%e0%a6%af-%e0%a6%97%e0%a6%b2%e0%a7%8d%e0%a6%aa-%e0%a6%b8%e0%a6%b9%e0%a6%9c-%e0%a6%aa%e0%a6%be%e0%a6%a0/"
                  >
                    দৃশ্য গল্প
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    href="https://karonbangladeshamar.com/category/%e0%a6%b8%e0%a6%b9%e0%a6%9c-%e0%a6%aa%e0%a6%be%e0%a6%a0/%e0%a6%9b%e0%a6%ac%e0%a6%bf%e0%a6%b0-%e0%a6%aa%e0%a6%be%e0%a6%a0/"
                  >
                    ছবির পাঠ
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    href="https://web.politicsmatters.com.bd/"
                  >
                    ই-লার্নিং
                  </a>
                </li>
              </ul>
            </li>

            <li className="nav-item">
              <NavLink className="" to="/">
                কুইজ
              </NavLink>
            </li>

            <li className="nav-item dropdown">
              <a
                className=" dropdown-toggle"
                data-bs-toggle="dropdown"
                href="#"
                role="button"
                aria-expanded="false"
              >
                ক্যাম্পেইন
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a
                    className="dropdown-item"
                    href="https://karonbangladeshamar.com/%e0%a6%97%e0%a6%a3%e0%a6%a4%e0%a6%a8%e0%a7%8d%e0%a6%a4%e0%a7%8d%e0%a6%b0-%e0%a6%89%e0%a7%8e%e0%a6%b8%e0%a6%ac/"
                  >
                    গণতন্ত্র উৎসব
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    href="https://karonbangladeshamar.com/category/%e0%a6%95%e0%a7%8d%e0%a6%af%e0%a6%be%e0%a6%ae%e0%a7%8d%e0%a6%aa%e0%a7%87%e0%a6%87%e0%a6%a8/%e0%a6%86%e0%a6%b0%e0%a7%8d%e0%a6%95%e0%a6%be%e0%a6%87%e0%a6%ad-%e0%a6%95%e0%a7%8d%e0%a6%af%e0%a6%be%e0%a6%ae%e0%a7%8d%e0%a6%aa%e0%a7%87%e0%a6%87%e0%a6%a8/"
                  >
                    সম্প্রীতি উৎসব
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    href="https://www.facebook.com/NarirJoyeShobarJoy"
                  >
                    নারীর জয়ে সবার জয়
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <a
                className=""
                href="https://karonbangladeshamar.com/%e0%a6%86%e0%a6%ae%e0%a6%be%e0%a6%a6%e0%a7%87%e0%a6%b0-%e0%a6%95%e0%a6%a5%e0%a6%be/"
              >
                আমাদের কথা
              </a>
            </li>

            <li className="nav-item">
              <a
                className=""
                href="https://karonbangladeshamar.com/%e0%a6%af%e0%a7%8b%e0%a6%97%e0%a6%be%e0%a6%af%e0%a7%8b%e0%a6%97/"
              >
                যোগাযোগ
              </a>
            </li>

            <li className="nav-item">
              {isAuthenticated ? (
                <button
                  onClick={(e) => handelLogout()}
                  className="btn p-0"
                  style={{ color: "#ccc" }}
                >
                  লগ আউট
                </button>
              ) : (
                <NavLink to="/login" className="">
                  লগ ইন
                </NavLink>
              )}
            </li>
          </div>
        </div>
      </section>
    </>
  );
};

export default Header;
