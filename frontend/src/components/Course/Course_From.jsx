import React, { useState } from "react";
import axios from "axios";
import "../../css/Course/CourseForm.css";

function CreateCourse() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState([]);
  const [tempContent, setTempContent] = useState("");

  const handleAddText = () => {
    setContent([...content, { type: "text", value: tempContent }]);
    setTempContent("");
  };

  const handleAddImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setContent([...content, { type: "image", value: url }]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || content.length === 0) {
      alert("Please fill in all fields and add at least one content item.");
      return;
    }

    try {
      const processedContent = [];

      for (let item of content) {
        if (item.type === "image" && item.value.startsWith("blob:")) {
          const response = await fetch(item.value);
          const blob = await response.blob();
          const formData = new FormData();
          formData.append("image", blob);

          // Upload image to backend
          const imageResponse = await axios.post(
            "http://localhost:8080/courses/CourseImage",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );

          const imageUrl = imageResponse.data; // Backend should return the image URL
          processedContent.push({ type: "image", value: imageUrl });
        } else {
          processedContent.push(item); // Text content
        }
      }

      const newCourse = {
        title,
        description,
        content: processedContent,
        createdBy: localStorage.getItem("userEmail"),
      };

      await axios.post("http://localhost:8080/courses", newCourse);

      alert("Course Created Successfully!");
      setTitle("");
      setDescription("");
      setContent([]);
    } catch (error) {
      console.error("Error while creating course:", error);
      alert("There was an error while creating the course.");
    }
  };

  return (
    <>
      <div className="course-container">
        <h1 className="course-title">Create Course</h1>

        <input
          className="input-title"
          placeholder="Course Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <br />

        <textarea
          className="input-description"
          placeholder="Course Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <br />
        <br />

        <h3 className="content-heading">Content:</h3>
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
    </>
  );
}

export default CreateCourse;
