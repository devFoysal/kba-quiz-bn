import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setQuizStart, setQuizLevel } from "../store/actions/quizAction";

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

const Completionist = () => {
  const { quizStart, quizLevel } = useSelector(state => state.quiz);
  const dispatch = useDispatch();
  dispatch(setQuizStart(false));
  if (quizLevel == 3) {
    return <span>Quiz Time Up</span>;
  }

  return <span>Here</span>;
};
const Timer2 = ({ hours, minutes, seconds, completed, setShowScore }) => {
  if (completed) {
    return <Completionist />;
  }

  return (
    <h5>
      অবশিষ্ট সময়:{replaceNumbers(hours.toString())}:
      {replaceNumbers(minutes.toString())}:{replaceNumbers(seconds.toString())}{" "}
      সেকেন্ড
    </h5>
  );
};
export default Timer2;
