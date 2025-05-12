import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");

  const handleManualLogin = async () => {
    try {
      setError(""); // Clear any previous error

      if (!email || !password) {
        setError("Please fill in all fields.");
        return;
      }

      const response = await axios.post("http://localhost:8080/api/users/login", {
        email,
        password,
      });

      const user = response.data;

      // Assuming response contains user object with name, imageUrl, and token
      localStorage.setItem("userToken", user.token);
      localStorage.setItem("userName", user.name);
      localStorage.setItem("userEmail", user.email);
      localStorage.setItem("userImage", user.imageUrl);
      setUserData(user);

      navigate("/");
    } catch (err) {
      console.error("Manual login error:", err);
      setError("Invalid email or password.");
    }
  };

  const handleLoginSuccess = async (credentialResponse) => {
    if (credentialResponse.credential) {
      const token = credentialResponse.credential;
      const decoded = jwtDecode(token);

      try {
        await axios.post("http://localhost:8080/api/users/google", {
          name: decoded.name,
          email: decoded.email,
          imageUrl: decoded.picture,
        });

        localStorage.setItem("userToken", token);
        localStorage.setItem("userName", decoded.name);
        localStorage.setItem("userEmail", decoded.email);
        localStorage.setItem("userImage", decoded.picture);
        setUserData(decoded);

        navigate("/");
      } catch (error) {
        console.error("Google login error:", error);
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="login-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <p style={{ color: "red" }}>{error}</p>}

          <button className="log-in-btn" type="button" onClick={handleManualLogin}>
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
            <Link to="/sign-up" style={{ color: "blue" }}>
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
