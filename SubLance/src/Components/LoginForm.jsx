import React, { useState } from 'react';
import '../index.css';
import Logo from '../assets/Logo.png'

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div className="login-container">
        <div className="logo-container">
          <img src={Logo} alt="Logo" />
          <h1>SubLance</h1>
        </div>
        <div>
        <h2>Member Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="email"
              placeholder="example@gmail.com"
              value={email}
              onChange={handleEmailChange}
            />
            <span className="input-icon">@</span>
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
            <span className="input-icon">🔒</span>
          </div>
          <button type="submit">Login</button>
        </form>
        <div className="options">
          <label>
            <a href="#">Forgot Password?</a> | <a href="#">Join with Us</a>
          </label >
        </div>
        </div>
    </div>
  );
}
 
        
export default Login;