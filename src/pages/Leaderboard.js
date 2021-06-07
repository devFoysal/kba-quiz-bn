import React, { useState, useEffect } from "react";
import Layout from "../components/LayoutNotCarousel";
import axios from "axios";

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
const Leaderboard = () => {
  const [leaderboards, setLeaderboards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("leaderboard")
      .then(response => {
        console.log(response);

        if (response.data) {
          setLeaderboards(response.data.result);
          setLoading(false);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <Layout>
      <div className="quiz-app">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <h2>লিডারবোর্ড</h2>
              {!loading ? (
                <table class="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">নাম</th>
                      <th scope="col">সঠিক উত্তর</th>
                      <th scope="col">সময় লেগেছে</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaderboards.map((board, i) => (
                      <tr>
                        <th scope="row">
                          {replaceNumbers((i + 1).toString())}
                        </th>
                        <td>{board.participant}</td>
                        <td>
                          {replaceNumbers(board.correctAnswer.toString())}
                        </td>
                        <td>
                          {replaceNumbers((board.time / 1000).toString())}{" "}
                          সেকেন্ড
                        </td>
                      </tr>
                    ))}
                  </tbody>
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

export default Leaderboard;
