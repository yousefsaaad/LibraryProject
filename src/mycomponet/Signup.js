import React, { useState } from "react";
import {  Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("user");
  const [secretKey, setSecretKey] = useState(""); // New state for secret key

  const history = useNavigate();

  function handleSignup(e) {
    e.preventDefault();
  
    // Check if user is an admin and security token is valid
    if (userType === "admin" && secretKey !== "102030") {
      alert("Invalid security token");
      return;
    }
  
    // send form data to server with a status of "pending"
    fetch("http://localhost:5000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullname,
        email,
        phone,
        password,
        userType,
        secretKey,
        status: "pending", // Add a status of "pending"
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.status === "ok") {
          alert("Registration successful");
        } else {
          alert("Registration failed");
        }
      })
      .catch((error) => console.log(error));
  }

  function handleUserTypeChange(event) {
    setUserType(event.target.value);
  }

  return (
    <div className="login-container">
      <div className="login-background"></div>
      <div className="login-box">
        <h1 className="login-heading">🅹🅾🅸🅽 🆄🆂</h1>
        <form className="login-form">
          <label htmlFor="fullname" className="login-label">
            Full Name
          </label>
          <input
            type="text"
            id="fullname"
            className="login-input"
            placeholder="Full Name"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
          />
          <label htmlFor="email" className="login-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="login-input"
            placeholder="someone@abc.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="phone" className="login-label">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            pattern="[0-9]{10}"
            className="login-input"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <label htmlFor="password" className="login-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="login-input"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="user-type-radio">
            <label>
              <input type="radio" value="admin" checked={userType === "admin"} onChange={handleUserTypeChange} />
              Admin
            </label>
            <br />
            <label>
              <input type="radio" value="user" checked={userType === "user"} onChange={handleUserTypeChange} />
              User
            </label>
          </div>
          {userType === "admin" && (
            <>
              <label htmlFor="secretKey" className="login-label">
                Secret Key
              </label>
              <input
                type="password"
                id="secretKey"
                className="login-input"
                placeholder="Enter your secret key"
                value={secretKey}
                onChange={(e) => setSecretKey(e.target.value)}
              />
            </>
          )}
          <button type="submit" className="login-button" onClick={handleSignup}>
            Signup
          </button>
        </form>
        <div className="login-footer">
          <p className="login-register">
            Have Account?{" "}
            <Link to="/Login" className="login-link">
              Login
            </Link>
          </p>
          <br />

          <button className="button-34" onClick={() => history(-1)}>
            BACK
          </button>
        </div>
      </div>
    </div>
  );
}