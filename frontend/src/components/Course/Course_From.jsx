import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../css/Course/CourseForm.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CreateCourse() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState([]);
  const [tempContent, setTempContent] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!title.trim()) newErrors.title = "Title is required.";
    if (!description.trim()) newErrors.description = "Description is required.";
    if (content.length === 0)
      newErrors.content = "Add at least one content item.";

    content.forEach((item, index) => {
      if (item.type === "video") {
        if (item.file && item.file.size > 100 * 1024 * 1024) {
          newErrors[`content-${index}`] = "Video must be under 100MB.";
        }
        if (item.file && !item.file.type.startsWith("video/")) {
          newErrors[`content-${index}`] = "Invalid video format.";
        }
      }
      if (item.type === "image") {
        if (item.file && item.file.size > 5 * 1024 * 1024) {
          newErrors[`content-${index}`] = "Image must be under 5MB.";
        }
        if (item.file && !item.file.type.startsWith("image/")) {
          newErrors[`content-${index}`] = "Invalid image format.";
        }
      }
    });

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleAddText = () => {
    if (tempContent.trim() !== "") {
      setContent([...content, { type: "text", value: tempContent }]);
      setTempContent("");
    }
  };

  const handleAddImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setContent([...content, { type: "image", value: url, file }]);
    }
  };

  const handleAddVideo = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setContent([...content, { type: "video", value: url, file }]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Invalid Data format !", {
        className: "instagram-toast",
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
      });
      return;
    }

    try {
      setIsUploading(true);
      const processedContent = [];

      for (let item of content) {
        if (
          (item.type === "image" || item.type === "video") &&
          item.value.startsWith("blob:")
        ) {
          const formData = new FormData();
          formData.append(item.type, item.file);

          const uploadUrl =
            item.type === "image"
              ? "http://localhost:8080/courses/CourseImage"
              : "http://localhost:8080/courses/CourseVideo";

          const response = await axios.post(uploadUrl, formData, {
            headers: { "Content-Type": "multipart/form-data" },
            onUploadProgress: (progressEvent) => {
              const percent = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              setUploadProgress(percent);
            },
          });

          processedContent.push({ type: item.type, value: response.data });
        } else {
          processedContent.push({ type: item.type, value: item.value });
        }
      }

      const userEmail = localStorage.getItem("userEmail");
      const userName = localStorage.getItem("userName");

      const newCourse = {
        title,
        description,
        content: processedContent,
        createdBy: userEmail,
      };

      await axios.post("http://localhost:8080/courses", newCourse);

      // ✅ Notify followers
      try {
        const userResponse = await axios.get(
          `http://localhost:8080/api/users/email/${userEmail}`
        );
        const followers = userResponse.data.followers || [];

        const followerEmails = [];

        for (const followerId of followers) {
          const followerResponse = await axios.get(
            `http://localhost:8080/api/users/${followerId}`
          );
          const followerEmail = followerResponse.data.email;
          if (followerEmail) followerEmails.push(followerEmail);
        }

        if (followerEmails.length > 0) {
          const notifyPayload = {
            followers: followerEmails,
            message: `${userName} created a new course: ${title}`,
            postId: null, // Optional: Replace with course ID if available
          };

          await axios.post(
            "http://localhost:8080/notifications/sendCourseNotification",
            notifyPayload
          );
        }
      } catch (notifyError) {
        console.error("Error sending notifications:", notifyError);
      }

      toast.success("Course Created Successfully !", {
        className: "instagram-toast",
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
      });

      setTitle("");
      setDescription("");
      setContent([]);

      setTimeout(() => navigate("/Course-Dashboard"), 1500);
    } catch (error) {
      console.error("Error while creating course:", error);
      toast.error("There was an error while creating the course.", {
        className: "instagram-toast",
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
      });
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <>
      <div className="course-container">
        <h1 className="course-title">Create Course</h1>

        <input
          className={`input-title ${errors.title ? "input-error" : ""}`}
          placeholder="Course Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {errors.title && <span className="error-text">{errors.title}</span>}
        <br />
        <br />

        <textarea
          className={`input-description ${
            errors.description ? "input-error" : ""
          }`}
          placeholder="Course Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {errors.description && (
          <span className="error-text">{errors.description}</span>
        )}
        <br />
        <br />

        <h3 className="content-heading">Content:</h3>
        {errors.content && <span className="error-text">{errors.content}</span>}
        <div className="content-list">
          {content.map((c, i) => (
            <div key={i} className="content-item">
              {c.type === "text" ? (
                <p className="content-text">{c.value}</p>
              ) : c.type === "image" ? (
                <img
                  className="content-image"
                  src={c.value}
                  alt="content"
                  width="100"
                />
              ) : c.type === "video" ? (
                <video width="200" controls>
                  <source src={c.value} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : null}

              {errors[`content-${i}`] && (
                <span className="error-text">{errors[`content-${i}`]}</span>
              )}
            </div>
          ))}
        </div>

        <input
          className="input-temp-content"
          placeholder="Add Text Content"
          value={tempContent}
          onChange={(e) => setTempContent(e.target.value)}
        />
        <button className="btn-add-text" onClick={handleAddText}>
          Add Text
        </button>
        <br />
        <br />

        <input
          className="input-image-upload"
          type="file"
          accept="image/*"
          onChange={handleAddImage}
        />
        <input
          className="input-video-upload"
          type="file"
          accept="video/*"
          onChange={handleAddVideo}
        />

        <br />
        <br />

        <button className="btn-submit" onClick={handleSubmit}>
          Create Course
        </button>
      </div>

      {isUploading && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Uploading Media...</h2>
            <div className="loading-bar">
              <div
                className="progress-bar"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
            <p>{uploadProgress}%</p>
          </div>
        </div>
      )}

      <ToastContainer />
    </>
  );
}

export default CreateCourse;
