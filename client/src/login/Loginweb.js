import React, { useState } from "react";
import {ToastContainer, toast } from "react-toastify";
import axios from "axios";
import Cookies from "js-cookie";
import "./login.scss";
function Loginweb() {
  const [login, setlogin] = useState({
    email: "",
    password: "",
  });

  const Laydata = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.value;
    setlogin({ ...login, [name]: value });
  };
  const senddata = async (event) => {
    event.preventDefault();
    const config = {
      "Content-Type": "application/json",
    };

    await axios
      .post("http://localhost:5000/api/login", login, { config })
      .then((res) => {
        const data = JSON.parse(res.data.message);
        localStorage.setItem("role", data.role);
        localStorage.setItem("name", data.name);
        localStorage.setItem("avatar", data.avatar);
        Cookies.set("cookielogin", data.msg);
        window.location.href = "/listdevicemuon";
      })
      .catch((err) => {
        console.log(err.response.data);
        if (err.response.data.message === "usererr") {
          return toast.error("Tài khoản không đúng ");
        } else {
          JSON.parse(err.response.data.message).map((data) => {
            toast.error(data.message);
          });
        }
      });
  };
  return (
    <div className="container">
      <ToastContainer
position="top-right"
autoClose={3000}
closeOnClick/>

      <div className="screen">
        <div className="screen__content">
          <form className="login">
            <div className="login__field">
              <i className="login__icon fas fa-user"></i>
              <input
                type="email"
                className="login__input"
                placeholder="Email"
                name="email"
                value={setlogin.email}
                onChange={Laydata}
              />
            </div>
            <div className="login__field">
              <i className="login__icon fas fa-lock"></i>
              <input
                type="password"
                className="login__input"
                placeholder="Password"
                name="password"
                value={setlogin.password}
                onChange={Laydata}
                required
              />
            </div>
            <button className="button login__submit" onClick={senddata}>
              <span className="button__text" >
                Log In Now
              </span>
              <i className="button__icon fas fa-chevron-right"></i>
            </button>
          </form>
          <div className="social-login">
            <h3>KMA</h3>
          </div>
        </div>
        <div className="screen__background">
          <span className="screen__background__shape screen__background__shape4"></span>
          <span className="screen__background__shape screen__background__shape3"></span>
          <span className="screen__background__shape screen__background__shape2"></span>
          <span className="screen__background__shape screen__background__shape1"></span>
        </div>
      </div>
    </div>
  );
}

export default Loginweb
