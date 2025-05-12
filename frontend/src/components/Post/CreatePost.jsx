import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';


function CreatePost() {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [location, setLocation] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userEmail");
  const userName = localStorage.getItem("userName");
  const userProfileImage = localStorage.getItem("userImage");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!caption || !location || !image) {
    toast.error("Please fill all the fields.");
    return;
  }

  try {
    setIsUploading(true);
    let contentUrl = null;

    if (image) {
      const formData = new FormData();
      formData.append("image", image);

      const imageResponse = await axios.post(
        "http://localhost:8080/image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const percent = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percent);
          },
        }
      );

      contentUrl = imageResponse.data;
    }

    // 1. Create the post
    const postResponse = await axios.post("http://localhost:8080/posts", {
      userId,
      userName,
      contentUrl,
      caption,
      userProfileImage,
      location,
      type: "img",
    });

    const createdPostId = postResponse.data.id || "new_post";

    // 2. Get current user data to fetch follower IDs
    const userResponse = await axios.get(`http://localhost:8080/api/users/email/${userId}`);
    const followers = userResponse.data.followers || [];

    // ✅ Fetch the emails of followers
    const followerEmails = [];

    for (const followerId of followers) {
      // Fetch the user's details (including email) by their ID
      const followerResponse = await axios.get(`http://localhost:8080/api/users/${followerId}`);
      const followerEmail = followerResponse.data.email;

      if (followerEmail) {
        followerEmails.push(followerEmail);
      }
    }

    // ✅ Send notifications only if followers exist
    if (followerEmails.length > 0) {
      const postNotifyPayload = {
        followers: followerEmails,
        message: `${userName} added a new post - ${caption}`,
        postId: createdPostId // instead of contentUrl
      };

      await axios.post("http://localhost:8080/notifications/send", postNotifyPayload);
    }

    navigate("/");
    setIsUploading(false);
  } catch (error) {
    console.error("Post error:", error);
    setIsUploading(false);
  }
};



  return (
    <div className="create-post">
      <h1 className="create-header">Create a Post</h1>
      <form className="create-container" onSubmit={handleSubmit}>
        <div className="image-container">
          {image ? (
            <div className="image-preview">
              <img
                src={URL.createObjectURL(image)}
                alt="Uploaded Preview"
                className="uploaded-image"
              />
              <button
                type="button"
                className="remove-btn"
                onClick={handleRemoveImage}
              >
                ✖
              </button>
            </div>
          ) : (
            <input
              className="imageInput"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              disabled={!!image}
            />
          )}
        </div>

        {/* Modal for uploading progress */}
        {isUploading && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <h2>Uploading Image...</h2>
                            <div className="loading-bar">
                                <div className="progress-bar" style={{ width: `${uploadProgress}%` }} />
                            </div>
                            <p>{uploadProgress}%</p>
                        </div>
                    </div>
                )}

        <div className="left-form">
          <textarea
            className="login-input caption-input"
            placeholder="Caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            style={{ height: "100px", width: "400px" }}
          />
          <input
            type="text"
            className="login-input"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <button className="create-post-btn" type="submit">
            Post
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}

export default CreatePost;
