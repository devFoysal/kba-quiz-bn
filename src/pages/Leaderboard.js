import React, { useState, useEffect } from "react";
import Layout from "../components/LayoutNotCarousel";
import axios from "axios";
import parse from "html-react-parser";
import { connect, useDispatch } from "react-redux";

import { getLeaderboard } from "../store/actions/leaderboardAction";

var numbers = {
  0: "০",
  1: "১",
  2: "২",
  3: "৩",
  4: "৪",
  5: "৫",
  6: "৬",
  7: "৭",
  8: "৮",
  9: "৯",
};

function replaceNumbers(input) {
  var output = [];
  for (var i = 0; i < input.length; ++i) {
    if (numbers.hasOwnProperty(input[i])) {
      output.push(numbers[input[i]]);
    } else {
      output.push(input[i]);
    }
  }
  return output.join("");
}
const Leaderboard = (props) => {
  const dispatch = useDispatch();
  const [leaderboards, setLeaderboards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (props.leaderboard) {
     
      setLeaderboards(props.leaderboard);
      setLoading(props.loading);
    }
    // axios
    //   .get("leaderboard")
    //   .then((response) => {
    //     if (response.data) {
    //       setLeaderboards(response.data.result);
    //       setLoading(false);
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }, [props]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await dispatch(props.getLeaderboard);
  };

  let monthName = [
    "জানুয়ারী",
    "ফেব্রুয়ারী",
    "মার্চ",
    "এপ্রিল",
    "মে",
    "জুন",
    "জুলাই",
    "আগষ্ট",
    "সেপ্টেম্বর",
    "অক্টোবর",
    "নভেম্বর",
    "ডিসেম্বর",
    "জানুয়ারী",
    "ফেব্রুয়ারী",
    "মার্চ",
    "এপ্রিল",
    "মে",
    "জুন",
    "জুলাই",
    "আগষ্ট",
    "সেপ্টেম্বর",
    "অক্টোবর",
    "নভেম্বর",
    "ডিসেম্বর",
  ];

  const renderLeaderBoardData = () => {
    let output = ``;
    Object.keys(props.leaderboard).forEach((key) => {
      output += `<tr><td colspan="4"><strong>${
        monthName[parseInt(key) - 1]
      }</strong></td>`;
      props.leaderboard[key].map((item, i) => {
        output += `<tr><th scope="row">${replaceNumbers(
          (i + 1).toString()
        )}</th><td>${item.participant}</td><td>${replaceNumbers(
          item.correctAnswer.toString()
        )}</td><td>${replaceNumbers((item.time / 1000).toString())} সেকেন্ড</td></tr>`;
      });
      output += `</tr>`;
    });

    return output;
  };

  return (
    <Layout>
      <div className="quiz-app">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <h2>লিডারবোর্ড</h2>
              {!loading ? (
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">নাম</th>
                      <th scope="col">সঠিক উত্তর</th>
                      <th scope="col">সময় লেগেছে</th>
                    </tr>
                  </thead>
                  <tbody>{parse(renderLeaderBoardData())}</tbody>
                </table>
              ) : (
                <h3>অনুগ্রহ করে অপেক্ষা করুন......</h3>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.leaderboard.loading,
    leaderboard: state.leaderboard.data,
  };
};

export default connect(mapStateToProps, { getLeaderboard })(Leaderboard);
