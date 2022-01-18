import f1 from "../assets/images/usbd.png";
import f2 from "../assets/images/democracy.png";
import f3 from "../assets/images/ukaid.png";

const Footer = () => {
  return (
    <>
      <section id="footer-1">
        <div className="container">
          <div className="row justify-content-center align-items-center">
            <div className="col-4 col-lg-3 text-center">
              <img src={f1} className="img-fluid" alt="" />
            </div>
            <div className="col-4 col-lg-3 text-center">
              <img src={f2} className="img-fluid" alt="" />
            </div>
            <div className="col-3 col-lg-3 text-center">
              <img src={f3} className="img-fluid" alt="" />
            </div>
          </div>
        </div>
      </section>
      <section id="footer-2" style={{ fontSize: "12px" }}>
        <div className="container">
          <div>
            <p
              style={{
                lineHeight: "1.6",
                marginBottom: "20px",
                marginTop: "30px",
              }}
            >
              “এই ওয়েবসাইটটি আমেরিকান জনগণের মাধ্যমে ইউনাইটেড স্টেটস এজেন্সি ফর
              ইন্টারন্যশনাল ডেভেলমেন্ট (ইউএসএআইডি) এর সহযোগিতায় তৈরী করা হয়েছে।
              এখানে উল্লেখিত বিষয়বস্তুর দায়িত্ব একান্তই ডেমোক্রেসি
              ইন্টারন্যাশনালের এবং তা ইউএসএআইডি কিংবা যুক্তরাষ্ট্র সরকারের
              মতামতকে প্রতিফলিত করে না।”
            </p>

            <p
              style={{
                lineHeight: "1.6",
                marginBottom: "20px",
                marginTop: "20px",
              }}
            >
              “যুক্তরাজ্য ডেমোক্রেসি ইন্টারন্যাশনালের কাজে আর্থিক সহায়তা প্রদান
              করলেও এই ওয়েবসাইটে প্রকাশিত মতামত যুক্তরাজ্য সরকারের নয়। এটি
              আবশ্যক নয় যে এই ওয়েবসাইটে প্রকাশিত মতামত যুক্তরাজ্য কর্তৃক সমর্থন
              প্রাপ্ত। এই ওয়েবসাইটে প্রকাশিত মতামতের দায় যুক্তরাজ্যের নয়।”
            </p>
          </div>
          <div className="row justify-content-between">
            <div className="col-lg-6">
              <p>© 2021 ডেমোক্রেসি ইন্টারন্যাশনাল। সর্বস্বত্ব সংরক্ষিত।</p>
            </div>
            <div
              className="col-lg-6 d-flex"
              style={{ justifyContent: "flex-end" }}
            >
              <div className="icon-div">
                <a
                  href="https://www.facebook.com/karonbangladeshamar"
                  style={{ color: "inherit" }}
                >
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a
                  href="https://www.youtube.com/channel/UCQ-Teu4PihByX_jU9FTVulQ"
                  style={{ color: "inherit" }}
                >
                  <i className="fab fa-youtube"></i>
                </a>
              </div>
              <div className="d-flex">
                <div className="alignright">
                  <a href="https://karonbangladeshamar.com/%e0%a6%86%e0%a6%ae%e0%a6%be%e0%a6%a6%e0%a7%87%e0%a6%b0-%e0%a6%95%e0%a6%a5%e0%a6%be/">
                    আমাদের কথা
                  </a>{" "}
                  |{" "}
                  <a href="https://karonbangladeshamar.com/%E0%A6%AF%E0%A7%8B%E0%A6%97%E0%A6%BE%E0%A6%AF%E0%A7%8B%E0%A6%97/">
                    যোগাযোগ
                  </a>{" "}
                  |{" "}
                  <a href="https://quizbn.karonbangladeshamar.com/login">লগ ইন</a>{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Footer;
