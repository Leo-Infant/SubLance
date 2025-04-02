import React from 'react'
import './Registrationpage.css'
import logo from 'C:/Personel Files/Projects/Sublance/React/SubLance/SubLance/src/assets/logo.png'
import usericon from 'C:/Personel Files/Projects/Sublance/React/SubLance/SubLance/src/assets/cheems.jpg'
import emailicon from 'C:/Personel Files/Projects/Sublance/React/SubLance/SubLance/src/assets/cheems.jpg'
import phoneicon from 'C:/Personel Files/Projects/Sublance/React/SubLance/SubLance/src/assets/cheems.jpg'
import passicon from 'C:/Personel Files/Projects/Sublance/React/SubLance/SubLance/src/assets/cheems.jpg'
import keyicon from 'C:/Personel Files/Projects/Sublance/React/SubLance/SubLance/src/assets/cheems.jpg'

const Registrationpage = () => {
  return (
    <div className="login-container">
      <div className="logo-container">
        <img src={logo} alt="logo" />
        <h1>SubLance</h1>
      </div>  
      <div className='inputs'>
          <h2>User Registration</h2>
          <form >
            <div className='input'>
                <input type='Name' placeholder='Your Name'></input>
                <img src={usericon} alt=''/>

                <input type='email' placeholder='example@gmail.com'></input>
                <img src={emailicon} alt=''></img>

                <input type='none' placeholder='Phone Number'></input>
                <img src={phoneicon} alt=''></img>

                <input type='password' placeholder='Enter your Password'></input>
                <img src={passicon} alt=''></img>

                <input type='password' placeholder='Re-enter your Password'></input>
                <img src={keyicon} alt=''></img>

                <select> 
                  <option value="" disabled selected>Who You are?</option>
                  <option>Creator</option>
                  <option>Freelancer</option>
                </select>

                <button type='submit'>Submit</button>
              

                <div className='ald'>Already registered?<a href='#'>Login</a></div>
            </div>
          </form>
      </div>
    </div>
  )
}


export default Registrationpage
