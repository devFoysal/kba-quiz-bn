import { combineReducers } from "redux";

import authReducer from "./authReducer";
import quizReducer from "./quizReducer";
import leaderboardReducer from "./leaderboardReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  quiz: quizReducer,
  leaderboard: leaderboardReducer,
});

export default rootReducer;
