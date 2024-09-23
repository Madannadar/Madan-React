import React, {useState} from 'react'
import './LoginSignUp.css'
import user_icon from '../Assets/person.png'
import email_icon from '../Assets/email.png'
import password_icon from '../Assets/password.png'

export const LoginSignUp = () => {

    const [action,setAction] = useState("Sign Up");

  return (
    <div className='SignUp_container'>
        <div className='header'>
            <div className='text'>{action}</div>
            <div className='underline'></div>
        </div>
        <div className='inputs'>
            {action=== "Login"?<div></div>:<div className='input'>
                <img src={user_icon} alt="" />
                <input type="text" placeholder='Enter your name'/>
            </div>}
            <div className='input'>
                <img src={email_icon} alt="" />
                <input type="email" placeholder='Enter your email'/>
            </div>
            <div className='input'>
                <img src={password_icon} alt="" />
                <input type="password" placeholder='Enter your password'/>
            </div>
            {action==="Login"?<div></div>:<div className='input'>
                <img src={password_icon} alt="" />
                <input type="Confirm-password" placeholder='Confirm your password'/>
            </div>}
            
        </div>
        {action==="Sign Up"?<div></div>:<div className="forgot-password">Lost Password? <span>Click Here</span></div>
        }
        <div className='submit-container'>
            <div className={action==="Login"?"Submit gray":"submit"} onClick={()=>{setAction("Sign Up")}}>Sign Up</div>
            <div className={action==="Sign Up"?"Submit gray":"submit"} onClick={()=>{setAction("Login")}}>Login</div>
        </div>
    </div>
  )
}
