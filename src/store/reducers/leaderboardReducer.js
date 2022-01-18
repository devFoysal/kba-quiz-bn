import {
  LEADERBOARD_FETCH_REQUEST,
  LEADERBOARD_FETCH_SUCCESS,
  LEADERBOARD_FETCH_FAILD,
} from "../actions/types";
const initialState = {
  loading: false,
  data: [],
  error: {},
};

const leaderboardReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case LEADERBOARD_FETCH_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LEADERBOARD_FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        data: actions.payload,
      };

    case LEADERBOARD_FETCH_FAILD:
      return {
        ...state,
        loading: false,
        data: [],
        error: actions.payload,
      };

    default:
      return state;
  }
};

export default leaderboardReducer;
