import welcome from "../assets/images/stage.png";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import Carousel from "../components/Carousel";
import HomeQuiz from "../components/HomeQuiz";
import Layout from "../components/Layout";
import banner from "../assets/images/mnemonic.png";
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
                  <img src={banner} class="d-block m-auto" width="300" alt="..." />
                </div>
                <p>
                  বাংলাদেশের স্বাধীনতার সুবর্ণজয়ন্তী উ্দযাপনে ডেমোক্রেসি
                  ইন্টারন্যাশনাল আয়োজিত{" "}
                  <strong>‘গণতন্ত্র উৎসবঃ পলিটিকস ম্যাটারস’</strong> কুইজ
                  প্রতিযোগিতায় স্বাগতম! রাজনীতি নাগরিকের জীবন ও জীবিকাকে
                  ব্যাপকভাবে প্রভাবিত করে। তাই চলুন, খেলতে খেলতে জেনে নেই আমাদের
                  দেশ এবং এর রাজনীতি সম্পর্কে, আর জিতে নেই পুরষ্কার।
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
