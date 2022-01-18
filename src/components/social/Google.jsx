import React from "react";
import GoogleLogin from "react-google-login";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { setSocialLogin } from "../../store/actions/authAction";

const Google = ({ operation }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const responseSuccessGoogle = response => {
    console.log(response);
    if (operation == "Login") {
      dispatch(setSocialLogin("google", response.tokenObj.access_token));
    }
  };
  const responseErrorGoogle = response => {
    console.log(response);
  };
  return (
    <GoogleLogin
      clientId="151613916231-vl91be4in6jt5ttsfn14vi8u8ccq4pvv.apps.googleusercontent.com"
      disabled={false}
      scope={
        "https://www.googleapis.com/auth/user.gender.read https://www.googleapis.com/auth/user.birthday.read"
      }
      buttonText={`গুগল লগইন`}
      onSuccess={responseSuccessGoogle}
      onFailure={responseErrorGoogle}
      cookiePolicy={"single_host_origin"}
    />
  );
};

export default Google;
