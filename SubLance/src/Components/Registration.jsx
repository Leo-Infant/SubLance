import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Styles from "./Registration.module.css";
import logo from "../assets/Logo.png";
import usericon from "../assets/Logo.png";
import emailicon from "../assets/Logo.png";
import phoneicon from "../assets/Logo.png";
import passicon from "../assets/Logo.png";
import keyicon from "../assets/Logo.png";

const Registration = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { confirmPassword, ...dataWithoutConfirmPassword } = formData;

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      console.log(dataWithoutConfirmPassword);
      const response = await fetch('http://localhost:8080/createUser', {
        method: 'POST',
        headers: { 'Content-Type':'application/json' },
        body: JSON.stringify(dataWithoutConfirmPassword),
      });
      console.log("test");
      if (response.status===200) {
        navigate("/login");
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className={Styles.wrapper}>
      <div className={Styles.loginContainer}>
        <div className={Styles.logoContainer}>
          <img src={logo} alt="logo" />
          <h1>SubLance</h1>
        </div>
        <div className={Styles.inputs}>
          <h2>User Registration</h2>
          <form onSubmit={handleSubmit}>
            <div className={Styles.input1}>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <img src={usericon} alt="" />

              <input
                type="email"
                name="email"
                placeholder="example@gmail.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <img src={emailicon} alt="" />

              <input
                type="tel"
                name="phoneNumber"
                placeholder="Phone Number"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
              <img src={phoneicon} alt="" />

              <input
                type="password"
                name="password"
                placeholder="Enter your Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <img src={passicon} alt="" />

              <input
                type="password"
                name="confirmPassword"
                placeholder="Re-enter your Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <img src={keyicon} alt="" />

              <select name="role" value={formData.role} onChange={handleChange} required>
                <option value="" disabled>
                  Who You are?
                </option>
                <option>CREATOR</option>
                <option>FREELANCER</option>
              </select>

              <button type="submit">Submit</button>
              <div className={Styles.ald}>
                Already registered? <a href="/login">Login</a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registration;
