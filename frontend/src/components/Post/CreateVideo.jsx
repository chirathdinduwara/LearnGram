import React, { useState, useMemo, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

function CreateVideo() {
  const [videoFile, setVideoFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [location, setLocation] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userEmail");
  const userName = localStorage.getItem("userName");
  const userProfileImage = localStorage.getItem("userImage");

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
    }
  };

  const handleRemoveVideo = () => {
    setVideoFile(null);
  };

  const videoPreviewURL = useMemo(() => {
    return videoFile ? URL.createObjectURL(videoFile) : null;
  }, [videoFile]);

  // Clean up the URL object to avoid memory leaks
  useEffect(() => {
    return () => {
      if (videoPreviewURL) {
        URL.revokeObjectURL(videoPreviewURL);
      }
    };
  }, [videoPreviewURL]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!caption || !location || !videoFile) {
      toast.error("Please fill all the fields.");
      return;
    }

    try {
      setIsUploading(true);
      let contentUrl = null;

      if (videoFile) {
        const formData = new FormData();
        formData.append("video", videoFile);

        const videoResponse = await axios.post(
          "http://localhost:8080/video",
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

        contentUrl = videoResponse.data;
      }

      await axios.post("http://localhost:8080/posts", {
        userId,
        userName,
        contentUrl,
        caption,
        userProfileImage,
        location,
        type: 'vid'
      });

      toast.success("Post added Successfully");
      navigate("/");
    } catch (error) {
      console.error("Error while saving post data:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="create-post">
      <h1 className="create-header">Create a Video</h1>
      <form className="create-container" onSubmit={handleSubmit}>
        <div className="video-container">
          {videoFile ? (
            <div className="video-preview">
              <video
                controls
                className="uploaded-video"
                src={videoPreviewURL}
                width="100%"
              />
              <button
                type="button"
                className="remove-btn"
                onClick={handleRemoveVideo}
              >
                ✖
              </button>
            </div>
          ) : (
            <input
              className="videoInput"
              type="file"
              accept="video/*"
              onChange={handleVideoChange}
              disabled={!!videoFile}
            />
          )}
        </div>

        {isUploading && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>Uploading Video...</h2>
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
          <button className="create-post-btn" type="submit" disabled={isUploading}>
            Post
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}

export default CreateVideo;
