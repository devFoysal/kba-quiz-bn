import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { setLogin } from "../store/actions/authAction";
import { useSelector, useDispatch } from "react-redux";
import Google from "../components/social/Google";
import Facebook from "../components/social/Facebook";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, errors, regMsg } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const handleLogin = async () => {
    if (loading) return;
    if (password.length <= 5) {
      alert("Password must be 6 characters or higher");
      return;
    } else if (email == "") {
      alert("Please Write Email Address");
      return;
    }
    let loginData = await dispatch(setLogin(email, password)).then(res => {
      return res.data;
    }).catch(error => {
      return false;
    });
    if(loginData){
      window.location.replace("https://quizbn.karonbangladeshamar.com/");
    }
  };

  useEffect(() => {
    return () => {
      dispatch({ type: "RESET_ERROR_LOGIN_DATA" });
    };
  }, []);

  return (
    <>
      <Header />
      <div className="login-app">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              {errors.message && (
                <span className="alert alert-danger">{errors.message}</span>
              )}

              {regMsg && regMsg.length > 0 && (
                <span className="alert alert-success">{regMsg}</span>
              )}
              <div className="form-group mt-4">
                <label htmlFor="exampleInputEmail1">ইমেইল</label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="ইমেইল"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">পাসওয়ার্ড</label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="পাসওয়ার্ড"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
              <div className="d-flex justify-content-between ">
                <button
                  onClick={e => handleLogin()}
                  type="submit"
                  className="btn btn-primary mt-2"
                >
                  {loading ? "অপেক্ষা করুন..." : "লগইন"}
                </button>
                <Link to="/verify-email">পাসওয়ার্ড ভুলে গেছেন?</Link>
              </div>
              <div className="d-flex justify-content-between mt-3">
                <Google operation="Login" />
                <Facebook operation="Login" />
              </div>

              <Link to="/register">
                <button
                  style={{ width: "100%" }}
                  className="btn btn-success btn-block mt-3"
                >
                  নতুন রেজিস্ট্রেশন করুন
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Login;
