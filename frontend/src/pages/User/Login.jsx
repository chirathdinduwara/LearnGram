import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  const handleLoginSuccess = async (credentialResponse) => {
    if (credentialResponse.credential) {
      const token = credentialResponse.credential;
      console.log("JWT Token:", token);

      const decoded = jwtDecode(token);
      console.log("User Details:", decoded);

      try {
        // Save user info to backend
        await axios.post("http://localhost:8080/api/users/google", {
          name: decoded.name,
          email: decoded.email,
          imageUrl: decoded.picture,
        });

        // Store token and email in localStorage
        localStorage.setItem("userToken", token);
        localStorage.setItem("userName", decoded.name)
        localStorage.setItem("userImage", decoded.picture)
        localStorage.setItem("userEmail", decoded.email);
        setUserData(decoded);

        // Redirect to homepage
        navigate("/");
      } catch (error) {
        console.error("Error while saving user data:", error);
      }
    }
  };

  const handleLoginError = () => {
    console.log("Google Login Failed");
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <div className="login-form-up">
          <h1 className="logo">LearnGram</h1>

          <div className="inputs-sec">
            <input
              type="email"
              placeholder="Enter Email"
              className="login-input"
            />
            <input
              type="password"
              placeholder="Password"
              className="login-input"
            />
          </div>

          <button className="log-in-btn" type="submit">
            Log In
          </button>

          <p className="or">OR</p>

          <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={handleLoginError}
            theme="filled_black"
            size="large"
            text="signin_with"
            shape="pill"
          />
        </div>

        <div className="login-form-down">
          <hr style={{ margin: "0" }} />
          <p className="sign-up-link">
            Don't have an account?{" "}
            <span style={{ color: "blue" }}>Sign Up</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
