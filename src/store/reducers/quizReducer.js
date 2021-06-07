import {
  SET_QUESTIONS,
  RESET_QUESTIONS,
  SET_QUIZ_START,
  SET_QUIZ_LEVEL,
  SET_TIME_LEFT,
  SET_FINAL_RESULT,
} from "../actions/types";
import cookies from "js-cookie";
const initialState = {
  quizStart: false,
  quizLevel: 1,
  timeleft: null,
  answerLoading: true,
  finalResult: null,
  answerLists: [],
};

const authReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case SET_QUESTIONS:
      return {
        ...state,
        answerLists: [...state.answerLists, actions.payload],
      };
    case RESET_QUESTIONS:
      return {
        ...state,
        answerLists: [],
      };
    case SET_TIME_LEFT:
      return {
        ...state,
        timeleft: actions.payload,
      };
    case SET_QUIZ_START:
      return {
        ...state,
        quizStart: actions.payload,
      };
    case SET_QUIZ_LEVEL:
      return {
        ...state,
        quizLevel: actions.payload,
      };

    case SET_FINAL_RESULT:
      return {
        ...state,
        answerLoading: false,
        finalResult: actions.payload,
      };

    default:
      return state;
  }
};

export default authReducer;
