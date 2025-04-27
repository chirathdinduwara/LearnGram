import React, { useState } from "react";
import axios from "axios";
import "../../css/Course/Course_From.css";

function Course_From({ onCourseCreated }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState([]);
  const [errors, setErrors] = useState({});
  const Token = localStorage.getItem("userTocken");

  const validateForm = () => {
    const newErrors = {};

    if (!title.trim()) newErrors.title = "Title is required.";
    if (!description.trim()) newErrors.description = "Description is required.";

    const contentErrors = content.map((item, index) => {
      if (item.text !== undefined && !item.text.trim()) {
        return `Content ${index + 1} is required.`;
      }
      return null;
    });

    if (contentErrors.some(Boolean)) {
      newErrors.content = contentErrors;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("createdBy", "USER1");

      content.forEach((item, index) => {
        if (item.text !== undefined) {
          formData.append(`content[${index}][text]`, item.text);
        }
        if (item.file !== null && item.file !== undefined) {
          formData.append(`content[${index}][file]`, item.file);
        }
      });

      await axios.post("http://localhost:8080/courses", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          'Authorization': `Bearer ${Token}`,
        },
      });

      // Reset form
      setTitle("");
      setDescription("");
      setContent([]);
      setErrors({});
      onCourseCreated();
    } catch (error) {
      console.error("Course creation failed:", error);
    }
  };

  const addTextContent = () => {
    setContent([...content, { text: "" }]);
  };

  const addImageContent = () => {
    setContent([...content, { text: undefined, file: null }]);
  };

  const handleContentChange = (index, value) => {
    const updatedContent = [...content];
    updatedContent[index].text = value;
    setContent(updatedContent);
  };

  const handleFileChange = (index, file) => {
    const updatedContent = [...content];
    updatedContent[index].file = file;
    setContent(updatedContent);
  };

  return (
    <div id="container">
      <form id="courseForm" onSubmit={handleSubmit}>
        <div id="image-section">
          <h3 id="heading">Create Your Course</h3>
          <div id="imageRow">
            <img
              id="image1"
              src="https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png"
              alt="Course Example"
            />
            <img
              id="image2"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCfz2XW-jS33OK4UkXXnB8LO2UegzmPl00Ew&s"
              alt="Course Example"
            />
          </div>
        </div>

        <h3 id="heading">Course Topic</h3>
        <input
          id="courseTitle"
          type="text"
          placeholder="Enter Course Title Here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {errors.title && <p className="error">{errors.title}</p>}

        <h3 id="heading">Course Description</h3>
        <textarea
          id="courseDescription"
          placeholder="Enter Course Description Here"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {errors.description && <p className="error">{errors.description}</p>}

        <div id="contentRow">
          <h3 id="heading">Course Content</h3>
          <button type="button" className="add-c-btn" onClick={addTextContent}>
            + Add Text
          </button>
          <button
            className="add-i-btn"
            type="button"
            onClick={addImageContent}
            style={{ marginLeft: "10px" }}
          >
            + Add Image
          </button>
        </div>

        {content.map((item, index) => (
          <div key={index} style={{ marginBottom: "20px" }}>
            {item.text !== undefined && (
              <input
                id="contentInput"
                type="text"
                placeholder={`Add Content Here ${index + 1}`}
                value={item.text}
                onChange={(e) => handleContentChange(index, e.target.value)}
              />
            )}

            {item.file !== undefined && (
              <>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(index, e.target.files[0])}
                />
                {item.file && (
                  <img
                    src={URL.createObjectURL(item.file)}
                    alt={`preview-${index}`}
                    style={{ width: "100px", marginTop: "10px" }}
                  />
                )}
              </>
            )}

            {errors.content && errors.content[index] && (
              <p className="error">{errors.content[index]}</p>
            )}
          </div>
        ))}

        <button id="publishButton" type="submit">
          Publish Course
        </button>
      </form>
    </div>
  );
}

export default Course_From;
