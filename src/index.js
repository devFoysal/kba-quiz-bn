import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./assets/scss/home.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";
import cookie from "js-cookie";
import { Provider } from "react-redux";
import store from "./store/index";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();
const apiUrl = "http://127.0.0.1:8000/api/";
// const apiUrl = "https://quizapi-bn.karonbangladeshamar.com/api";

axios.defaults.baseURL = apiUrl;
axios.defaults.headers.common["Authorization"] = `Bearer ${cookie.get(
  "token"
)}`;

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <Router>
        <App />
      </Router>
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
