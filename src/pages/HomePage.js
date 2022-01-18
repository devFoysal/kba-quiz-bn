import React, { useEffect, useState } from "react";

import welcome from "../assets/images/stage.png";
import { Link } from "react-router-dom";
import Carousel from "../components/Carousel";
import HomeQuiz from "../components/HomeQuiz";
import Layout from "../components/Layout";
import banner from "../assets/images/mn.png";

import { connect, useDispatch } from "react-redux";

import { getLeaderboard } from "../store/actions/leaderboardAction";

// const backendUrl = "http://127.0.0.1:8000/";
const backendUrl = "https://quizapi-en.karonbangladeshamar.com/";

const HomePage = (props) => {
  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await dispatch(props.getLeaderboard);
  };

  useEffect(() => {
    let userId =
      props.user && Object.keys(props.user).length > 0 ? props.user.id : null;

    let allData = [];
    props.leaderboardData &&
      Object.keys(props.leaderboardData).forEach((key) => {
        allData.push(props.leaderboardData[key]);
      });

    let leaderboardData = [].concat.apply([], allData);
    if (leaderboardData !== null && userId !== null) {
      let lb = leaderboardData.filter((lb) => lb.participantId === userId);
      lb.length > 0 ? setIsLoggedIn(true) : setIsLoggedIn(false);
    }
  }, [props.leaderboardData, props.user]);

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
                    className="d-block m-auto"
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

        {isLoggedIn && (
          <section
            id="certificate"
            className="py-5"
            style={{ background: "#d8d8d826" }}
          >
            <div className="container">
              <div className="text-center">
                <h1 style={{ color: "#da1e3a", fontWeight: 700 }}>অভিনন্দন!</h1>
                <p style={{ fontSize: "18px" }} className="py-3">
                  আপনি কুইজ প্রতিযোগিতায় লিডারবোর্ডে ১০ জনের মধ্যে অবস্থান
                  করছেন।
                </p>
                <a
                  href={`${backendUrl}certificate/${
                    props.user && props.user.id
                  }`}
                  target="_blank"
                  className="d-block"
                  className="btn btn-primary"
                  style={{ backgroundColor: "#736f6f", borderColor: "#736f6f" }}
                >
                  সাটিফিকেট এর জন্য ক্লিক করুন এখানে
                </a>
              </div>
            </div>
          </section>
        )}
      </>
    </Layout>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    leaderboardData: state.leaderboard.data,
  };
};

export default connect(mapStateToProps, { getLeaderboard })(HomePage);
