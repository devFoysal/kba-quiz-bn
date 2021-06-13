import welcome from "../assets/images/stage.png";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import Carousel from "../components/Carousel";
import HomeQuiz from "../components/HomeQuiz";
import Layout from "../components/Layout";
import banner from "../assets/images/mn.png";
const HomePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Layout>
      {/* welcome to vote */}
      <>
        <section id="welcome-to-vote" className="m-0 ">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 text-center">
                <img src={welcome} className="img-fluid" alt="" />
              </div>
              <div className="col-lg-6">
                <div>
                  <img
                    src={banner}
                    class="d-block m-auto"
                    width="300"
                    alt="..."
                  />
                </div>
                <p>
                  বাংলাদেশের বিজয়ের সুবর্ণজয়ন্তীর পুণ্যলগ্নে দেশের তরুণদের মধ্যে
                  জ্ঞানভিত্তিক রাজনৈতিক অংশগ্রহণকে উৎসাহিত করতে ডেমোক্রেসি
                  ইন্টারন্যাশনাল আয়োজন করছে{" "}
                  <strong>‘গণতন্ত্র উৎসব: পলিটিক্স ম্যাটারস’ </strong>
                  অনলাইন কুইজ প্রতিযোগিতা।{" "}
                </p>

                <p>
                  রাজনীতি প্রতিটি নাগরিকের জীবন ও জীবিকাকে প্রভাবিত করে। তাই
                  আমাদের রাজনীতি সচেতন হতে হবে।{" "}
                </p>

                <p>
                  {" "}
                  চলুন, খেলতে খেলতে আমাদের দেশ ও রাজনীতি সম্পর্কে জানি, জিতি
                  পুরস্কার, হই সেরা কুইজবাজ।
                </p>

                <div className="d-felx justify-content-between">
                  <Link to="/quiz">
                    <button className="btn lets-play">চলো খেলি</button>
                  </Link>
                  <Link to="/leaderboard">
                    <button className="btn lets-play ml-2">লিডারবোর্ড</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    </Layout>
  );
};

export default HomePage;
