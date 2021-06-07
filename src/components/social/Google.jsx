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
      clientId="555982705247-en1tr11t2beuq8vvrg9httfgt8eb36bk.apps.googleusercontent.com"
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
