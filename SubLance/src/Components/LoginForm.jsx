import React, { useState } from 'react';
import Logo from '../assets/Logo.png'
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import Styles from './LoginForm.module.css'

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    console.log(event.target.value)
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
    const body = {
      email , 
      password ,
    };
   try{
      const request = await fetch ('http://localhoost:8080/token' , { 
        method : 'POST',
        header : {
          'Content-type' : application/json,
        },
        body : JSON.stringify(body),
      });
      if(!Response.ok){
        throw new Error ('HTTP Error : ${response.status}' );
      }
      const data = await Response.json();
      console.log('Token : ', data);

      setEmail("");
      setPassword("");
   }catch(error){
    console.log('Error during request',error)
   }
    
  };

  return (
    <div className={Styles.loginContainer}>
        <div className={Styles.logoContainer}>
          <img src={Logo} alt="Logo" />
          <h1>SubLance</h1>
        </div>
        <div>
          <h2>Member Login</h2>
          <form onSubmit={handleSubmit}>
            <div className={Styles.inputGroup}>
                <input
                  type="email"
                  placeholder="example@gmail.com"
                  value={email}
                  onChange={handleEmailChange}
                />
                <span className={Styles.inputIcon}><MdEmail /></span>
            </div>
            <div className={Styles.inputGroup}>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={handlePasswordChange}
                />
                <span className={Styles.inputIcon}><FaLock /></span>
            </div>
            <button type="submit">Login</button>
          </form>
          <div className={Styles.options}>
            <label>
              <a href="#">Forgot Password?</a> | <a href="#">Join with Us</a>
            </label >
          </div>
        </div>
    </div>
  );
}
 
        
export default Login;