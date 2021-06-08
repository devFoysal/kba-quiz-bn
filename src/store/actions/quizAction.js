import {
  SET_QUIZ_START,
  SET_TIME_LEFT,
  SET_QUIZ_LEVEL,
  SET_QUESTIONS,
  SET_FINAL_RESULT,
} from "./types";
import axios from "axios";
import cookie from "js-cookie";

export const getQuizeTime = msg => {
  return dispatch => {
    dispatch({
      type: SET_TIME_LEFT,
      payload: msg,
    });
  };
};

export const setQuizStart = msg => {
  return dispatch => {
    dispatch({
      type: SET_QUIZ_START,
      payload: msg,
    });
  };
};

export const setQuizLevel = msg => {
  return dispatch => {
    dispatch({
      type: SET_QUIZ_LEVEL,
      payload: msg,
    });
  };
};

export const setQuizAnswer = msg => {
  return dispatch => {
    dispatch({
      type: SET_QUESTIONS,
      payload: msg,
    });
  };
};

export const sendQuizStart = date => {
  return dispatch => {
    return axios
      .post("/quiz/start", {
        date,
      })
      .then(response => {
        console.log(response);
        // history.push("/my-account/my-membership");
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const submitAnswer = time => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${cookie.get(
    "token"
  )}`;

  return (dispatch, getState) => {
    const answerLists = getState().quiz.answerLists;
    return axios
      .post("quiz/submit", { answerLists, endTime: time })
      .then(response => {
        console.log(response);
        dispatch({
          type: SET_FINAL_RESULT,
          payload: response.data.message,
        });
        // history.push("/my-account/my-membership");
      })
      .catch(err => {
        console.log(err.response);
        dispatch({
          type: SET_FINAL_RESULT,
          payload: err.response.data.error,
        });
      });
  };
};
