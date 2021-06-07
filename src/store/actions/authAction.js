import {
  SET_LOGIN,
  SET_LOGOUT,
  ERROR_LOGIN,
  ERROR_LOGOUT,
  RESET_USER_DATA,
  SET_LOADING,
  SET_REG_MESSGAE,
} from "./types";
import axios from "axios";
import cookies from "js-cookie";
import { toast } from "react-toastify";

export const setLogin = (email, password) => {
  toast.dismiss();
  toast.warning(`অনুগ্রহ করে অপেক্ষা করুন, লগইন সম্পন হচ্ছে...`, {
    autoClose: false,
    hideProgressBar: true,
  });
  return dispatch => {
    dispatch({ type: SET_LOADING });
    return axios
      .post("/participant/login", {
        email,
        password,
      })
      .then(response => {
        toast.dismiss();
        cookies.set("token", response.data.access_token);
        cookies.set("user", response.data.participant);
        dispatch({ type: SET_LOGIN, payload: response.data });
        console.log(response);
        // history.push("/my-account/my-membership");
      })
      .catch(err => {
        toast.dismiss();
        if (err.response)
          dispatch({ type: ERROR_LOGIN, payload: err.response.data });
        else
          dispatch({
            type: ERROR_LOGIN,
            payload: { message: "সার্ভার এর সমস্যা ঘটেছে" },
          });
      });
  };
};

export const setSocialLogin = (service, token, value = null) => {
  toast.dismiss();
  toast.warning(`অনুগ্রহ করে অপেক্ষা করুন, সোশ্যাল লগিন হচ্ছে...`, {
    autoClose: false,
    hideProgressBar: true,
  });
  return dispatch => {
    return axios
      .post("participant/social/login", {
        service,
        token,
        value,
      })
      .then(response => {
        toast.dismiss();
        if (response.data.success && response.data.success == "false") {
        } else {
          cookies.set("token", response.data.access_token);
          cookies.set("user", response.data.participant);
          dispatch({ type: SET_LOGIN, payload: response.data });
        }
        // history.push("/my-account/my-membership");
      })
      .catch(err => {
        toast.dismiss();
        if (err.response)
          dispatch({ type: ERROR_LOGIN, payload: err.response.data });
        else
          dispatch({
            type: ERROR_LOGIN,
            payload: { message: "সার্ভার এর সমস্যা ঘটেছে" },
          });
      });
  };
};

export const setLogout = () => {
  cookies.remove("token");
  cookies.remove("user");

  return dispatch => {
    dispatch({ type: SET_LOGOUT });

    axios.defaults.headers.common["Authorization"] = `Bearer ${cookies.get(
      "token"
    )}`;
    return axios
      .post("auth/logout")
      .then(response => {
        console.log(response);
        window.location.replace("/");
      })
      .catch(err => {
        dispatch({ type: ERROR_LOGOUT, err });
      });
  };
};

export const resetData = () => {
  return dispatch => {
    cookies.remove("token");
    cookies.remove("user");
    dispatch({ type: SET_LOGOUT });
    dispatch({ type: RESET_USER_DATA });
  };
};

export const regSuccessMessage = msg => {
  return dispatch => {
    dispatch({
      type: SET_REG_MESSGAE,
      payload: msg,
    });
  };
};
