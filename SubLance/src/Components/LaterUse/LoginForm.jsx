import React, { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { AuthContext } from './context/AuthContext';
import Logo from '../assets/Logo.png';
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import StylesLogin from './LoginForm.module.css';
// http://localhost:8080/token
// POST

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setToken } = useContext(AuthContext); // Use Context to store token globally

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      const response = await fetch('http://localhost:8080/token', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        setError("Invalid email or password");
        return;
      }

      const data = await response.json();
      const token = data.token;
      const userRole = data.role;

      localStorage.setItem("authToken", token);
      setToken(token);

      userRole === "ROLE_CREATOR" ? navigate('/creatorHome') : navigate('/freelancerHome');

      setEmail("");
      setPassword("");
    } catch (error) {
      setError("Something went wrong. Please try again.");
      console.error('Error during login:', error);
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className={StylesLogin.wrapper}>
      <div className={StylesLogin.loginContainer}>
        <div className={StylesLogin.logoContainer}>
          <img src={Logo} alt="Logo" />
          <h1>SubLance</h1>
        </div>
        <div>
          <h2>Member Login</h2>
          {error && <p className={StylesLogin.error}>{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className={StylesLogin.inputGroup}>
                <input
                  type="email"
                  placeholder="example@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <span className={StylesLogin.inputIcon}><MdEmail /></span>
            </div>
            <div className={StylesLogin.inputGroup}>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span className={StylesLogin.inputIcon}><FaLock /></span>
            </div>
            <button type="submit">Login</button>
          </form>
          <div className={StylesLogin.options}>
            <label>
              <a href="#">Forgot Password?</a> | <a href="/register">Join with Us</a>
            </label >
          </div>
        </div>
    </div>
    </div>
  );
}

export default Login;

