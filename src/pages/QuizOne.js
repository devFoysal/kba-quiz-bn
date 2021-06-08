import React, { useEffect, useState } from "react";
import Layout from "../components/LayoutNotCarousel";
import axios from "axios";
import cookie from "js-cookie";
import Countdown from "react-countdown";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  setQuizStart,
  setQuizLevel,
  setQuizAnswer,
  sendQuizStart,
  submitAnswer,
} from "../store/actions/quizAction";
import { resetData } from "../store/actions/authAction";
import Timer2 from "../components/Timer2";

var numbers = {
  0: "0",
  1: "1",
  2: "2",
  3: "3",
  4: "4",
  5: "5",
  6: "6",
  7: "7",
  8: "8",
  9: "9",
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

const QuizOne = () => {
  const { quizLevel, quizStart, answerLoading, finalResult } = useSelector(
    state => state.quiz
  );

  const user = useSelector(state => state.auth.user);
  const [quiz, setQuiz] = useState([]);
  const [quizStartTime, setQuizStartTime] = useState("");
  const [quizALL, setQuizALL] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [duration, setDuration] = useState(null);
  const [quizLoading, setQuizLoading] = useState(false);
  const [quizEnd, setQuizEnd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [quizError, setQuizError] = useState(
    `দুঃখিত কুইজ প্রশ্ন প্রকাশ করা সম্ভব হচ্ছে না। আপনি কি লগ ইন করেছেন ? অথবা পেইজটি রিফ্রেশ করুন`
  );

  const [updateInputs, setUpdateInputs] = useState({
    contactNumber: "",
  });

  const [updateErrors, setUpdateErrors] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    setQuizLoading(true);
    axios.defaults.headers.common["Authorization"] = `Bearer ${cookie.get(
      "token"
    )}`;
    axios
      .get("quiz/all")
      .then(res => {
        if (res.data && res.data.data) {
          let quizData = res.data.data.filter(e => e.id == quizLevel)[0];
          setQuiz(quizData);
          setQuizALL(res.data.data);
          setTimeLeft(quizData.duration);
          setQuestions(quizData.questions);
          // dispatch(setQuizStart(true));
          setQuizLoading(false);
          setShowModal(true);
        }
      })
      .catch(err => {
        setQuizLoading(false);
        console.log(err.response);
        if (err.response && err.response.status == 401) {
          dispatch(resetData());
        } else if (err.response && err.response.status == 420) {
          setQuizError(err.response.data.message);
        }
      });
  }, []);

  useEffect(() => {
    let data = quizALL.filter(e => e.id == quizLevel)[0];
    if (quizLevel >= 2 && quizLevel <= 3) {
      setQuiz(data);
      setCurrentQuestion(0);
      setTimeLeft(data.duration);
      setQuestions(data.questions);
      dispatch(setQuizStart(true));
      console.log(quizLevel, data);
    }
  }, [quizLevel]);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [colorbtn, setColorbtn] = useState(false);
  const [clickedId, setClickedId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showMobileModal, setShowMobileModal] = useState(false);
  const [canceltSubmitQuiz, setCanceltSubmitQuiz] = useState(false);
  const [timeLeft, setTimeLeft] = useState(duration);

  const [contactNumber, setContactNumber] = useState(null);

  const handleModal = (start = false) => {
    setShowModal(!showModal);
    if (start == true) {
      dispatch(setQuizStart(true));
      dispatch(sendQuizStart(+Date.now()));
      setQuizStartTime(new Date().toLocaleTimeString());
    }
  };

  const finalQuizSubmit = (submit = false) => {
    if (submit == true) {
      submitUpdateData();
    } else {
      setShowMobileModal(false);
      setCanceltSubmitQuiz(true);
    }
  };

  const handleAnswerOptionClick = id => {
    setClickedId(id);
    setColorbtn(true);
    dispatch(
      setQuizAnswer({
        answerId: id,
        quizLevel,
        time: timeLeft,
      })
    );
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      if (quizLevel == 3) {
        setQuizEnd(true);
        if (user.contactNumber.length > 0) {
          setShowScore(true);
          dispatch(submitAnswer(+Date.now()));
        } else {
          setShowMobileModal(true);
        }
      }
      dispatch(setQuizStart(false));
      dispatch(setQuizLevel(quizLevel + 1));
    }
    setColorbtn(false);
    setClickedId(null);
  };

  const handleUpdateInputChange = event => {
    event.persist();
    setUpdateInputs(inputs => ({
      ...inputs,
      [event.target.name]:
        event.target.name == "avatar"
          ? event.target.files[0]
          : event.target.value,
    }));
  };

  const submitUpdateData = async () => {
    if (loading) {
      alert("Please Wait... Dont be hurry. we are processing your data");
      return;
    }
    const formData = new FormData();

    Object.keys(updateInputs).forEach(function (key, index) {
      formData.append(key, updateInputs[key]);
      console.log(key, index);
    });

    try {
      setLoading(true);
      const res = await axios.post("/participant/update", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(res);
      setLoading(false);
      if (res.data.success == true) {
        setShowMobileModal(false);
        setShowScore(true);
        dispatch(submitAnswer(+Date.now()));
      } else {
      }
    } catch (err) {
      console.log(err.response);
      setLoading(false);
      if (err.response) setUpdateErrors(err.response.data);
    }
  };

  return (
    <Layout>
      <div className="quiz-app">
        <div className="container">
          <div className="row">
            {canceltSubmitQuiz ? (
              <div className="col-12 text-center">
                দুঃখিত,আমরা কুইজটি সম্পন্ন করতে ব্যর্থ হয়েছি, দয়া করে আপডেট করুন
                আপনার মোবাইল নাম্বার
              </div>
            ) : null}
            <div className="col-12 text-center">
              {showScore ? (
                <div className="row justify-content-center">
                  <div className="col-lg-6 score-section-bg">
                    <div className="score-section">
                      {answerLoading ? (
                        <span>
                          {" "}
                          আপনার কুইজ এর ফলাফল এর জন্য অনুগ্রহ করে অপেক্ষা
                          করুন......{" "}
                        </span>
                      ) : (
                        <>
                          <h3>ফলাফল :</h3>
                          <h5>{finalResult}</h5>
                          <Link to="/leaderboard">
                            <button className="btn lets-play ml-2">
                              লিডারবোর্ড
                            </button>
                          </Link>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ) : quizStart && !showModal ? (
                <>
                  <div className="question-section">
                    <div className="row justify-content-center mb-5">
                      <div className="col-lg-10">
                        <div className="time-box">
                          <div>
                            <h5>
                              কুইজ শুরুঃ{" "}
                              {replaceNumbers(quizStartTime.toString())}
                            </h5>
                          </div>
                          <div>
                            <Countdown
                              date={Date.now() + timeLeft}
                              intervalDelay={100}
                              renderer={Timer2}
                              precision={3}
                              onTick={e => {
                                console.log(e);
                                setTimeLeft(e.total);
                              }}
                              onComplete={e => {
                                dispatch(setQuizLevel(quizLevel + 1));
                                if (quizLevel == 3) {
                                  dispatch(setQuizStart(false));

                                  setQuizEnd(true);
                                  if (user.contactNumber.length > 0) {
                                    setShowScore(true);
                                    dispatch(submitAnswer(+Date.now()));
                                  } else {
                                    setShowMobileModal(true);
                                  }
                                }
                              }}
                              onPause={e => {
                                console.log("pause");
                              }}
                              onStop={e => {
                                console.log("Stop");
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <h2 style={{ fontWeight: "bold" }} className="mb-4">
                      {quiz && quiz.titleBn}
                    </h2>
                    <div className="row justify-content-center">
                      <div className="col-lg-6">
                        {/* <div className="question-count">
                        <span>Question {currentQuestion + 1}</span>/
                        {questions.length}
                      </div> */}
                        <div className="question-text">
                          {questions.length > 0 &&
                            questions[currentQuestion].titleBn}
                        </div>
                      </div>
                    </div>
                  </div>
                  {questions.length > 0 && (
                    <div className="answer-section">
                      <div className="row">
                        {questions[currentQuestion].answers.map(
                          answerOption => (
                            <div className="col-lg-6">
                              <button
                                className={
                                  clickedId === answerOption.id
                                    ? "btn color-btn"
                                    : "btn"
                                }
                                onClick={() =>
                                  handleAnswerOptionClick(answerOption.id)
                                }
                              >
                                {answerOption.titleBn}
                              </button>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}
                </>
              ) : quizLoading == true ? (
                <span>অনুগ্রহ করে অপেক্ষা করুন ......</span>
              ) : !quizEnd ? (
                <span>{quizError}</span>
              ) : null}
            </div>
          </div>
        </div>

        {/* MODAL */}
        <div
          class={showModal ? "modal fade show d-block" : "modal fade d-none"}
          id="exampleModalLong"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLongTitle"
          aria-hidden="true"
          style={{ overflow: "auto" }}
        >
          <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  তুমি এখন আছো
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={e => handleModal(false)}
                ></button>
              </div>
              <div class="modal-body">
                <div className="current-levels">
                  <span className="dot dot-active">ধাপ ০১</span>
                  <span className="dot">ধাপ ০২</span>
                  <span className="dot">ধাপ ০৩</span>
                </div>
                <div className="game-rules">
                  <h3>
                    ‘গণতন্ত্র উৎসবঃ পলিটিক্স ম্যাটারস’ অনলাইন কুইজ প্রতিযোগিতার
                    অংশগ্রহণের নিয়ম ও শর্তাবলীঃ
                  </h3>
                  <li>
                    ১৮ বছরের ওপর যেকোনো বাংলাদেশী নাগরিকের জন্য কুইজ প্রতিযোগিতা
                    উন্মুক্ত।
                  </li>
                  <li>
                    ১০ জুন থেকে ৩১ ডিসেম্বর ২০২১ পর্যন্ত প্রতিযোগিতায় অংশগ্রহণ
                    করা যাবে।
                  </li>
                  <li>
                    প্রতি মাসের প্রথম দিনেই নতুন কুইজের বিষয় ও প্রশ্ন নির্ধারণ
                    করে কারণ বাংলাদেশ আমার ওয়েবসাইটে কুইজ মেনুতে আপলোড করা হবে
                    এবং ‘কারণ বাংলাদেশ আমার’ ফেইসবুক পেইজ ও{" "}
                    <a href="https://www.facebook.com/groups/718296318974660">
                      ‘কারণ বাংলাদেশ আমার’ ফেইসবুক গ্রুপে{" "}
                    </a>{" "}
                    কুইজের বিষয় ঘোষণার মাধ্যমে প্রতিযোগিতায় অংশগ্রহণের জন্য
                    আহ্বান জানানো হবে।
                  </li>
                  <li>
                    কুইজ সংক্রান্ত সমস্ত তথ্য পেতে{" "}
                    <a href="#">‘কারণ বাংলাদেশ আমার’ ফেইসবুক গ্রুপের </a> সদস্য
                    হতে হবে।
                  </li>
                  <li>
                    কারণ বাংলাদেশ আমার ওয়েবসাইটে লগ ইন অথবা নিবন্ধনের মাধ্যমে
                    প্রতিযোগিতায় অংশ নিতে পারবেন।
                  </li>
                  <li>
                    ফেসবুক, গুগল একাউন্ট দিয়ে লগ ইন করা যাবে অথবা লগ ইন ছাড়াও
                    নিবন্ধন করা যাবে।
                  </li>
                  <li>একজন প্রতিযোগী একটি মাধ্যমে কেবল একবার খেলতে পারবেন।</li>
                  <li>
                    প্রত্যেক প্রতিযোগীকে সঠিক তথ্য প্রদানের মাধ্যমে প্রতিযোগিতায়
                    অংশগ্রহণ করতে হবে।
                  </li>
                  <li>
                    খেলায় জিততে হলে সবগুলো ধাপের কুইজে অবশ্যই অংশ নিতে হবে।
                  </li>
                  <li>
                    প্রতিটি ধাপে তিনটি করে কুইজ আছে। একটি ধাপের অধীনে একটি
                    প্রশ্ন দেয়া আছে।
                  </li>
                  <li>
                    প্রতিটি প্রশ্নের জন্য নির্ধারিত সময়ের মধ্যে খেলা শেষ করতে
                    হবে।
                  </li>
                  <li>খেলার শেষে কুইজের ফলাফল প্রকাশ করা হবে না।</li>
                  <li>
                    প্রতি মাসে কুইজ খেলে অপেক্ষাকৃত কম সময়ে দ্রুত সঠিক সেরা ১০
                    উত্তরদাতা নির্বাচিত হবেন।
                  </li>

                  <li>
                    এই সেরা দশের মধ্য থেকে স্কোরের ভিত্তিতে প্রতি মাসে সেরা তিন
                    জন সঠিক উত্তরদাতা নির্বাচিত হবেন।
                  </li>
                  <li>
                    প্রয়োজনে লটারির ভিত্তিতে সেরা ৩ বিজয়ী নির্ধারণ করা হবে।
                  </li>
                  <li>
                    সেরা ১০ বিজয়ীর নাম প্রতি মাসের প্রথম ১৫ দিনের মধ্যে কারণ
                    বাংলাদেশ আমার ফেইসবুক পেইজ ও নির্ধারিত গ্রুপে ঘোষণা করা হবে।
                  </li>
                  <li>
                    প্রতিযোগিতা সংক্রান্ত যেকোনো বিষয়ে আয়োজকের সিদ্ধান্তই
                    চূড়ান্ত বলে বিবেচিত হবে।
                  </li>
                  <li>
                    ডেমোক্রেসি ইন্টারন্যশনাল, ইউএসএআইডি, ইউকেএইড বা বিটনিকের
                    সাথে সংশ্লিষ্ট বা তাদের পরিবারের কোন সদস্য এই কুইজ
                    প্রতিযোগিতায় অংশগ্রহণ করতে পারবেন না।
                  </li>
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-closes"
                  data-bs-dismiss="modal"
                  onClick={e => handleModal(true)}
                >
                  কুইজ শুরু করুন
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Get Mobile and Picture  */}

        <div
          class={
            showMobileModal ? "modal fade show d-block" : "modal fade d-none"
          }
          id="exampleModalLong"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLongTitle"
          aria-hidden="true"
          style={{ overflow: "auto" }}
        >
          <div class="modal-dialog ">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  কুইজটি জমা দেওয়ার জন্য অনুগ্রহ করে তথ্যগুলো আপডেট করুন
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={e => finalQuizSubmit(false)}
                ></button>
              </div>
              <div class="modal-body">
                <div class="form-group row">
                  <label for="contactNumber" class="col-sm-2 col-form-label">
                    মোবাইল
                  </label>
                  <div class="col-sm-10">
                    <input
                      type="email"
                      class="form-control"
                      name="contactNumber"
                      placeholder="আপনার মোবাইল নাম্বারটি দিন"
                      onChange={handleUpdateInputChange}
                    />

                    <small className="d-block text-danger mb-3">
                      {updateErrors.errors &&
                        updateErrors.errors.contactNumber &&
                        updateErrors.errors.contactNumber[0]}
                    </small>
                  </div>
                </div>

                <div class="form-group row">
                  <label for="contactNumber" class="col-sm-2 col-form-label">
                    আপডেট প্রোফাইল পিকচার
                  </label>
                  <div class="col-sm-10">
                    <input
                      name="avatar"
                      type="file"
                      class="form-control"
                      onChange={handleUpdateInputChange}
                    />
                    <small className="d-block text-danger mb-3">
                      {updateErrors.errors &&
                        updateErrors.errors.avatar &&
                        updateErrors.errors.avatar[0]}
                    </small>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-closes"
                  data-bs-dismiss="modal"
                  onClick={e => finalQuizSubmit(true)}
                >
                  {loading ? "চলমান..." : "কুইজ জমা দিন"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default QuizOne;
