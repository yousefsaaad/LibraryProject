import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function handleLogin(e) {
    e.preventDefault();
    fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error(response.statusText);
        }
      })
      .then((data) => {
        if (data.status === "ok" && data.user.userType === "admin") {
          navigate("/admin");
        } else if (data.status === "ok" && data.user.userType !== "admin" && data.user.status === "approved") {
          navigate("/userhomepage");
        } else if (data.status === "ok" && data.user.status === "pending") {
          setErrorMessage("Your account is still pending approval");
        } else if (data.status === "ok" && data.user.status === "rejected") {
          setErrorMessage("Your account has been rejected");
        } else {
          setErrorMessage(data.error);
        }
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage("Invalid email or password");
      });
  }

  return (
    <>
      <div className="login-container">
        <div className="login-background"></div>
        <div className="login-box">
          <h1 className="login-heading">🅻🅴🆃'🆂 🅶🅾</h1>
          {errorMessage && (
            <p className="error-message">{errorMessage}</p>
          )}
          <form className="login-form" onSubmit={handleLogin}>
            <label htmlFor="email" className="login-label">
              Email
            </label>
            <input
              type="text"
              id="email"
              className="login-input"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="password" className="login-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="login-input"
              placeholder="Enter your password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="login-button">
              Login
            </button>
          </form>
          <div className="login-footer">
            <p className="login-register">
              Don't have an account?{" "}
              <Link to="/Signup" className="login-link">
                Register now
              </Link>
            </p>
            <br />
            <button className="button-34" onClick={() => navigate(-1)}>
              BACK
            </button>
          </div>
        </div>
      </div>
    </>
  );
}