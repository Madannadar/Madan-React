import React, {useState} from 'react'
import './LoginSignUp.css'
import user_icon from '../Assets/person.png'
import email_icon from '../Assets/email.png'
import password_icon from '../Assets/password.png'

export const LoginSignUp = () => {

    // const [Name,setName] = useState('')
    // const [email,setemail] = useState('')
    // const [password,setpassword] = useState('')
    // const [Confirmpassword,setConfirmpassword] = useState('')
    const [action,setAction] = useState("Sign Up");

    // function handleSubmit(event){
    //     event.preventDefault();
    // }

  return (
    
    <div className='SignUp_container'>
        {/* <form onSubmit={{handleSubmit}}> */}
        <div className='header'>
            <div className='text'>{action}</div>
            <div className='underline'></div>
        </div>
        <div className='inputs'>
            {action=== "Login"?<div></div>:<div className='input'>
                <img src={user_icon} alt="" />
                <input type="text" placeholder='Enter your name'
                // onChange={e => setName(e.target.value)}
                />
            </div>}
            <div className='input'>
                <img src={email_icon} alt="" />
                <input type="email" placeholder='Enter your email'
                // onChange={e => setemail(e.target.value)}
                />
            </div>
            <div className='input'>
                <img src={password_icon} alt="" />
                <input type="password" placeholder='Enter your password'
                // onChange={e => setpassword(e.target.value)}
                />
            </div>
            {action==="Login"?<div></div>:<div className='input'>
                <img src={password_icon} alt="" />
                <input type="Confirm-password" placeholder='Confirm your password'
                // onChange={e => setConfirmpassword(e.target.value)}
                />
            </div>}
            
        </div>
        {action==="Sign Up"?<div></div>:<div className="forgot-password">Lost Password? <span>Click Here</span></div>
        }
        <div className='submit-container'>
            <div className={action==="Login"?"Submit gray":"submit"} onClick={()=>{setAction("Sign Up")}}>Sign Up</div>
            <div className={action==="Sign Up"?"Submit gray":"submit"} onClick={()=>{setAction("Login")}}>Login</div>
        </div>
    {/* </form> */}
    </div>
  )
}
