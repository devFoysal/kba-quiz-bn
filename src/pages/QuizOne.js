import React, { useEffect, useState } from "react";
import Layout from "../components/LayoutNotCarousel";
import axios from "axios";
import cookie from "js-cookie";
import Countdown from "react-countdown";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import GameRules from "../components/GameRules/index";
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
    // console.log(quizStartTime , 'quizStartTime')
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
      dispatch(sendQuizStart(Date.now()));
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
          dispatch(submitAnswer(Date.now()));
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
        dispatch(submitAnswer(Date.now()));
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
                <GameRules />
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
                                    dispatch(submitAnswer(Date.now()));
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
                <span>
                  {quizError}
                  {!showModal && <GameRules />}
                </span>
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
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  তুমি এখন আছো
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={e => handleModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="current-levels">
                  <span className="dot dot-active">ধাপ ০১</span>
                  <span className="dot">ধাপ ০২</span>
                  <span className="dot">ধাপ ০৩</span>
                </div>
                <GameRules />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-closes"
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
          <div className="modal-dialog ">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  কুইজটি জমা দেওয়ার জন্য অনুগ্রহ করে তথ্যগুলো আপডেট করুন
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={e => finalQuizSubmit(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="form-group row">
                  <label for="contactNumber" className="col-sm-2 col-form-label">
                    মোবাইল
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="email"
                      className="form-control"
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

                <div className="form-group row">
                  <label for="contactNumber" className="col-sm-2 col-form-label">
                    আপডেট প্রোফাইল পিকচার
                  </label>
                  <div className="col-sm-10">
                    <input
                      name="avatar"
                      type="file"
                      className="form-control"
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
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-closes"
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
