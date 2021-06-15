import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { setLogin } from "../store/actions/authAction";
import { useSelector, useDispatch } from "react-redux";

import { toast } from "react-toastify";

import axios from "axios";

const VerifyEmail = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { loading, errors, regMsg } = useSelector((state) => state.auth);
  const [isVerifiedEmail, setIsVerifiedEmail] = useState(false);

  const handleLogin = async () => {
    if (loading) return;
    if (email == "") {
      alert("দয়া করে আপনার ই-মেইলটি দিন");
      return;
    }

    // toast.dismiss();
    toast.warning(`অনুগ্রহ করে অপেক্ষা করুন, ই-মেইল যাচাই হচ্ছে...`, {
      autoClose: false,
      hideProgressBar: true,
    });

    let res = await emailVerify(email);

    if (res) {
      setIsVerifiedEmail(res);

      setTimeout(() => {
        toast.dismiss();
      }, 3000);
    } else {
      setIsVerifiedEmail(res);

      setTimeout(() => {
        toast.dismiss();
        toast.error(
          `ই-মেইলটি খুজে পাওয়া যায়নি। অনুগ্রহ করে সঠিক ই-মেইলটি দিন...`,
          {
            autoClose: false,
            hideProgressBar: true,
          }
        );
      }, 800);

      setTimeout(() => {
        toast.dismiss();
      }, 5000);
    }
  };

  const emailVerify = async (email) => {
    return axios
      .post("/participant/verify-email", { email })
      .then((response) => {
        return response.data.verified;
        // history.push("/my-account/my-membership");
      })
      .catch((err) => {
        return err.response.data.verified;
      });
  };

  const handleNewPassword = async () => {
    if (password == "") {
      alert("দয়া করে নতুন পাসওয়ার্ড দিন");
      return;
    } else if (confirmPassword == "") {
      alert("দয়া করে নতুন পাসওয়ার্ড আবার দিন");
      return;
    } else if (password.length <= 5) {
      alert("পাসওয়ার্ড ৫ সংখ্যার বড় হতে হবে।");
      return;
    } else if (confirmPassword.length <= 5) {
      alert("পাসওয়ার্ড ৫ সংখ্যার বড় হতে হবে।");
      return;
    } else if (confirmPassword != password) {
      alert("আপনি ভুল পাসওয়ার্ড দিয়েছেন");
      return;
    }

    let res = await newPassword(password, confirmPassword);
    if (res) {
      setTimeout(() => {
        toast.dismiss();
        toast.success(`পাসওয়ার্ড পরিবর্তন হয়েছে।`, {
          autoClose: false,
          hideProgressBar: true,
        });
        props.history.push("/login");
      }, 800);
    }
  };

  const newPassword = () => {
    toast.dismiss();
    toast.warning(`অনুগ্রহ করে অপেক্ষা করুন...`, {
      autoClose: false,
      hideProgressBar: true,
    });

    return axios
      .post("/participant/new-password", { email, password })
      .then((response) => {
        return response.data.status;
        // history.push("/my-account/my-membership");
      })
      .catch((err) => {
        return err.response.data.status;
      });
  };

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
              {!isVerifiedEmail && (
                <>
                  <div className="form-group mt-4">
                    <label htmlFor="exampleInputEmail1">ইমেইল</label>
                    <input
                      type="email"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="ইমেইল"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="d-flex justify-content-between ">
                    <button
                      onClick={(e) => handleLogin()}
                      type="submit"
                      className="btn btn-primary mt-2"
                    >
                      {loading ? "অপেক্ষা করুন..." : "যাচাই করুণ"}
                    </button>
                  </div>
                </>
              )}

              {isVerifiedEmail && (
                <>
                  <div className="form-group mb-4">
                    <label htmlFor="exampleInputEmail1">
                      নতুন পাসওয়ার্ড দিন
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="exampleInputEmail1"
                      placeholder="*******"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputPassword1">
                      আবার নতুন পাসওয়ার্ড দিন
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="exampleInputPassword1"
                      placeholder="*******"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                  <div className="d-flex justify-content-between ">
                    <button
                      onClick={(e) => handleNewPassword()}
                      type="submit"
                      className="btn btn-primary mt-2"
                    >
                      {loading ? "অপেক্ষা করুন..." : "পরিবর্তন করুণ"}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default VerifyEmail;
