import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {toast ,ToastContainer} from 'react-toastify';

function SignUp() {
  const navigate = useNavigate();

  // Form state
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    image: null,
  });

  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setForm({ ...form, image: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleManualSignUp = async () => {
    setError("");
    const { name, email, password, image } = form;

    if (!name || !email || !password) {
      toast.error("All fields are required.");
      return;
    }

    try {
      let imageUrl = "";

      if (image) {
        const formData = new FormData();
        formData.append("image", image);

        const imageRes = await axios.post("http://localhost:8080/image", formData, {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (e) => {
            const percent = Math.round((e.loaded * 100) / e.total);
            setUploadProgress(percent);
          },
        });

        imageUrl = imageRes.data;
      }

      await axios.post("http://localhost:8080/api/users/", {
        name,
        email,
        password,
        imageUrl,
      });

      localStorage.setItem("userName", name);
      localStorage.setItem("userEmail", email);
      localStorage.setItem("userImage", imageUrl);

      navigate("/login");
    } catch (err) {
      console.error("Signup error:", err);
      toast.error("Signup failed. Please try again.");
    }
  };

  const handleGoogleSignUp = async (credentialResponse) => {
    try {
      const token = credentialResponse?.credential;
      if (!token) throw new Error("No token found");

      const decoded = jwtDecode(token);

      await axios.post("http://localhost:8080/api/users/google", {
        name: decoded.name,
        email: decoded.email,
        imageUrl: decoded.picture,
      });

      localStorage.setItem("userToken", token);
      localStorage.setItem("userName", decoded.name);
      localStorage.setItem("userEmail", decoded.email);
      localStorage.setItem("userImage", decoded.picture);

      navigate("/login");
    } catch (err) {
      console.error("Google sign-up error:", err);
      toast.error("Google sign-up failed.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <div className="login-form-up">
          <h1 className="logo">LearnGram</h1>
          <div className="inputs-sec">
            <input
              type="text"
              name="name"
              placeholder="Enter Name"
              className="login-input"
              value={form.name}
              onChange={handleInputChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              className="login-input"
              value={form.email}
              onChange={handleInputChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="login-input"
              value={form.password}
              onChange={handleInputChange}
            />
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleInputChange}
              className="login-input"
            />
          </div>

          {uploadProgress > 0 && <p>Uploading: {uploadProgress}%</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}

          <button className="log-in-btn" type="button" onClick={handleManualSignUp}>
            Sign Up
          </button>

          <p className="or">OR</p>

          <GoogleLogin
            onSuccess={handleGoogleSignUp}
            onError={() => setError("Google Sign-Up Failed")}
            theme="filled_black"
            size="large"
            text="signup_with"
            shape="pill"
          />
        </div>

        <div className="login-form-down">
          <hr style={{ margin: "0" }} />
          <p className="sign-up-link">
            Already have an account?{" "}
            <Link to="/login" style={{ color: "blue" }}>
              Log In
            </Link>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default SignUp;
