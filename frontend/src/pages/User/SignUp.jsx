import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";



function SignUp() {

  const navigate = useNavigate();

  const [userData, setUserData] = useState(null); 


  return (
    <div className="login-container">
      <div className="login-form">
        <div className="login-form-up">
          <h1 className="logo">LearnGram</h1>
          <div className="inputs-sec">
            <input type="text" placeholder="Ente Name" className="login-input"/>
            <input type="email" placeholder="Enter Email" className="login-input" />
            <input type="password" placeholder="Password" className="login-input" />
          </div>
          <button className="log-in-btn" type="submit">Sign Up</button>

        </div>
        <div className="login-form-down">
          <hr style={{margin: '0'}} />
          <p className="sign-up-link">Already have an account ? <span style={{color: "blue"}}>Log In</span></p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
