import {
  LEADERBOARD_FETCH_REQUEST,
  LEADERBOARD_FETCH_SUCCESS,
  LEADERBOARD_FETCH_FAILD,
} from "./types";
import axios from "axios";
import cookie from "js-cookie";

export const fetchRequest = () => ({
  type: LEADERBOARD_FETCH_REQUEST,
});

export const fetchSuccess = (data) => ({
  type: LEADERBOARD_FETCH_SUCCESS,
  payload: data,
});

export const fetchFaild = (error) => ({
  type: LEADERBOARD_FETCH_FAILD,
  payload: error,
});

export const getLeaderboard = () => (dispatch) => {
  dispatch(fetchRequest());
  return axios
    .get("leaderboard")
    .then((response) => {
      if (response.data) {
        dispatch(fetchSuccess(response.data.result));
      }
    })
    .catch((err) => {
      dispatch(fetchFaild(err));
    });
};
