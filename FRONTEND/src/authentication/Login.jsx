import React, { useState } from "react";
import "./styles/Login.css";
import { DiApple } from "react-icons/di";
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../../config";
import { useAuth } from "../components/contextapi/AuthContext";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  //useAuth for setting the local storage values
  const {setIsAdminLoggedIn, setIsCustomerLoggedIn, setIsSellerLoggedIn} = useAuth()

  // useAuth code
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${config.url}/admin/checkadminlogin`,
        formData
      );
      if (response.status === 200) {
        if(response.data.role == "ADMIN"){
          setIsAdminLoggedIn(true)
          navigate("/admin-dashboard")
        }else if(response.data.role == "BUYER"){
          setIsSellerLoggedIn(true)
          navigate("/sellerhome")
        }else{
          setIsCustomerLoggedIn(true)
          navigate("/customerhome")
        }
      } else {
        setMessage(response.data);
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data);
      } else {
        setError("Unexpected Error");
      }
    }
  };

  return (
    <div>
      <p className="login-header">
        <strong>ASTHETICA</strong>
      </p>
      {message ? (
        <p>{message}</p> // display Message
      ) : error ? (
        <p>{error}</p> // display error
      ) : (
        <form onSubmit={handleSubmit} className="login">
          <div className="login-section">
            <div className="header">
              <h2>Welcome Back</h2>
              <p className="header-quote">Sign in to explore curated works</p>
            </div>
            <div className="form-section">
              <p>Username</p>
              <input
                className="login-input-field"
                type="text"
                id="username"
                placeholder="Enter username"
                value={formData.username}
                onChange={handleChange}
              />
              <p>password</p>
              <input
                className="login-input-field"
                type="password"
                id="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div className="check-section">
              <div style={{ display: "flex", fontSize: "small" }}>
                <label htmlFor="remember">Remember Me</label>
                <input type="checkbox" id="remember" />
              </div>
              {/* This forget password needs to be changed using <Link></Link>*/}
              <a href="">
                <p>Forgot password ?</p>
              </a>
            </div>
            <div className="login-page-btn">
              <button>Sign In</button>
            </div>
            <div className="ggl-fcbk-sign">
              <div className="login-divider">
                <span>or</span>
              </div>
              <div className="login-opts">
                <button>
                  <DiApple />
                  <p>Sign In with Apple</p>
                </button>
              </div>
              <div className="login-opts">
                <button type="submit">
                  <FaGoogle />
                  <p>Sign In with Google</p>
                </button>
              </div>
              {/*Add corresponsind links in this page*/}
              <p className="login-register">
                Don't have an account?{" "}
                <Link to="/register">
                  <span>Register here</span>
                </Link>
              </p>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default Login;
