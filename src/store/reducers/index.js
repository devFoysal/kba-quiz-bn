import { combineReducers } from "redux";

import authReducer from "./authReducer";
import quizReducer from "./quizReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  quiz: quizReducer,
});

export default rootReducer;
