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

  // Validate the form inputs
  const validateForm = () => {
    const newErrors = {};

    if (!title.trim()) newErrors.title = "Title is required.";
    if (!description.trim()) newErrors.description = "Description is required.";
    if (content.length === 0)
      newErrors.content = "Add at least one content item.";

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Invalid Data format !");
      return;
    }

    try {
      setIsUploading(true);
      const processedContent = [];

      for (let item of content) {
        if (item.type === "image" && item.value.startsWith("blob:")) {
          const formData = new FormData();
          formData.append("image", item.file);

          const imageResponse = await axios.post(
            "http://localhost:8080/courses/CourseImage",
            formData,
            {
              headers: { "Content-Type": "multipart/form-data" },
              onUploadProgress: (progressEvent) => {
                const percent = Math.round(
                  (progressEvent.loaded * 100) / progressEvent.total
                );
                setUploadProgress(percent);
              },
            }
          );

          processedContent.push({ type: "image", value: imageResponse.data });
        } else {
          processedContent.push({ type: "text", value: item.value });
        }
      }

      const newCourse = {
        title,
        description,
        content: processedContent,
        createdBy: localStorage.getItem("userEmail"),
      };

      await axios.post("http://localhost:8080/courses", newCourse);

      toast.success("Course Created Successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      setTitle("");
      setDescription("");
      setContent([]);

      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      console.error("Error while creating course:", error);
      toast.error("There was an error while creating the course.", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
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
              ) : (
                <img
                  className="content-image"
                  src={c.value}
                  alt="content"
                  width="100"
                />
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
        <br />
        <br />

        <button className="btn-submit" onClick={handleSubmit}>
          Create Course
        </button>
      </div>

      {/* Upload Progress Modal */}
      {isUploading && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Uploading Image...</h2>
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

      {/* Toast Message Container */}
      <ToastContainer />
    </>
  );
}

export default CreateCourse;
