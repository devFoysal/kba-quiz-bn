import React from "react";
import { useDispatch } from "react-redux";
import FacebookLogin from "react-facebook-login";
import { useHistory } from "react-router-dom";

import "./login.css";
import {
  setSocialLogin,
  setSocialRegister,
} from "../../store/actions/authAction";

const Facebook = ({ operation }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const responseFacebook = response => {
    if (response.status == "unknown") return; /// Handeling Close Pop Up
    if (operation == "Login") {
      dispatch(setSocialLogin("facebook", response.accessToken, response));
    }
  };
  return (
    <FacebookLogin
      appId="431205104828774"
      fields="name,email,picture"
      icon="fa-facebook"
      textButton={`ফেসবুক লগইন`}
      callback={responseFacebook}
      cssClass="my-facebook-button-class"
    />
  );
};

export default Facebook;
