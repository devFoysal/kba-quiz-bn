import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import axios from "axios";
import { useDispatch } from "react-redux";
import { regSuccessMessage } from "../store/actions/authAction";
import { useHistory } from "react-router-dom";

const Register = () => {
  const [regsterInputs, setRegisterInputs] = useState({
    gender: "male",
  });
  let history = useHistory();
  const [regErrors, setRegErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const handleRegInputChange = event => {
    event.persist();
    setRegisterInputs(inputs => ({
      ...inputs,
      [event.target.name]:
        event.target.name == "avatar"
          ? event.target.files[0]
          : event.target.value,
    }));
  };

  const submitRegData = async () => {
    if (loading) {
      alert("Please Wait... Dont be hurry. we are processing your data");
      return;
    }
    const formData = new FormData();

    Object.keys(regsterInputs).forEach(function (key, index) {
      formData.append(key, regsterInputs[key]);
      console.log(key, index);
    });

    try {
      setLoading(true);
      const res = await axios.post("/participant/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(res);
      setLoading(false);
      if (res.data.message) {
        dispatch(regSuccessMessage(res.data.message));
      }

      history.push("/login");
    } catch (err) {
      setLoading(false);
      console.log(err);
      if (err.response) setRegErrors(err.response.data);
    }
  };
  return (
    <>
      <Header />
      <div className="login-app">
        <div className="container">
          {regErrors.message && (
            <div className="alert alert-danger bg-warning my-3" role="alert">
              {regErrors.message}
            </div>
          )}
          <div class="row justify-content-center">
            <div className="col-lg-4">
              <div class="form-group">
                <label for="exampleInputEmail1">নাম</label>
                <input
                  type="text"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="নাম"
                  name="fullName"
                  onChange={handleRegInputChange}
                />
                <small className="d-block text-danger mb-3">
                  {regErrors.errors &&
                    regErrors.errors.fullName &&
                    regErrors.errors.fullName[0]}
                </small>
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">আপলোড ছবি</label>
                <input
                  type="file"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  onChange={handleRegInputChange}
                  name="avatar"
                />
                <small className="d-block text-danger mb-3">
                  {regErrors.errors &&
                    regErrors.errors.avatar &&
                    regErrors.errors.avatar[0]}
                </small>
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">ইমেইল</label>
                <input
                  type="email"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="ইমেইল"
                  name="email"
                  onChange={handleRegInputChange}
                />
                <small className="d-block text-danger mb-3">
                  {regErrors.errors &&
                    regErrors.errors.email &&
                    regErrors.errors.email[0]}
                </small>
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1">পাসওয়ার্ড</label>
                <input
                  type="password"
                  class="form-control"
                  id="exampleInputPassword1"
                  placeholder="পাসওয়ার্ড"
                  name="password"
                  onChange={handleRegInputChange}
                />
                <small className="d-block text-danger mb-3">
                  {regErrors.errors &&
                    regErrors.errors.password &&
                    regErrors.errors.password[0]}
                </small>
              </div>

              <div class="form-group">
                <label for="exampleInputPassword1">মোবাইল</label>
                <input
                  type="text"
                  class="form-control"
                  id="exampleInputPassword1"
                  placeholder="মোবাইল"
                  name="contactNumber"
                  onChange={handleRegInputChange}
                />
                <small className="d-block text-danger mb-3">
                  {regErrors.errors &&
                    regErrors.errors.contactNumber &&
                    regErrors.errors.contactNumber[0]}
                </small>
              </div>

              <div class="form-group">
                <label for="exampleInputPassword1">বয়স</label>
                <input
                  type="number"
                  class="form-control"
                  id="exampleInputPassword1"
                  placeholder="বয়স"
                  name="age"
                  onChange={handleRegInputChange}
                />
                <small className="d-block text-danger mb-3">
                  {regErrors.errors &&
                    regErrors.errors.age &&
                    regErrors.errors.age[0]}
                </small>
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1">ঠিকানা</label>
                <textarea
                  className="form-control"
                  placeholder="ঠিকানা"
                  name="address"
                  onChange={handleRegInputChange}
                ></textarea>
                <small className="d-block text-danger mb-3">
                  {regErrors.errors &&
                    regErrors.errors.address &&
                    regErrors.errors.address[0]}
                </small>
              </div>

              <div class="form-group">
                <label for="exampleInputPassword1">লিঙ্গ</label>
                <select
                  className="form-control"
                  name="gender"
                  onChange={handleRegInputChange}
                >
                  <option selected value="male">
                    পুরুষ
                  </option>
                  <option value="female">নারী</option>
                  <option value="transgender">ট্রান্সজেন্ডার</option>
                  <option value="other">অন্যান্য</option>
                </select>
                <small className="d-block text-danger mb-3">
                  {regErrors.errors &&
                    regErrors.errors.gender &&
                    regErrors.errors.gender[0]}
                </small>
              </div>
              <div class="d-flex justify-content-between">
                <button
                  onClick={e => submitRegData()}
                  type="submit"
                  class="btn btn-primary mt-2"
                >
                  {loading ? "অপেক্ষা করুন..." : "রেজিস্টার"}
                </button>
                <Link to="/login">
                  <button className="btn btn-primary mt-2">লগইন</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Register;
