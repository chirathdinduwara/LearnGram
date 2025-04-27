import React, { useState } from "react";
import axios from "axios";
import "../../css/Course/Course_From.css";

function Course_From({ onCourseCreated }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState([]);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!title.trim()) newErrors.title = "Title is required.";
    if (!description.trim()) newErrors.description = "Description is required.";

    const contentErrors = content.map((item, index) =>
      item.text !== undefined && !item.text.trim()
        ? `Content ${index + 1} is required.`
        : null
    );

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
        if (item.file !== null) {
          formData.append(`content[${index}][file]`, item.file);
        }
      });

      await axios.post("http://localhost:8080/courses", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

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

  const handleContentChange = (i, value) => {
    const updated = [...content];
    updated[i].text = value;
    setContent(updated);
  };

  const handleFileChange = (i, file) => {
    const updated = [...content];
    updated[i].file = file;
    setContent(updated);
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
              alt="img"
            />
            <img
              id="image2"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCfz2XW-jS33OK4UkXXnB8LO2UegzmPl00Ew&s"
              alt="img"
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
        ></textarea>
        {errors.description && <p className="error">{errors.description}</p>}

        <div id="contentRow">
          <h3 id="heading">Course Content</h3>
          <button type="button" onClick={addTextContent}>
            + Add Text
          </button>
          <button type="button" onClick={addImageContent} style={{ marginLeft: "10px" }}>
            + Add Image
          </button>
        </div>

        {content.map((item, i) => (
          <div key={i} style={{ marginBottom: "20px" }}>
            {item.text !== undefined && (
              <input
                id="contentInput"
                type="text"
                placeholder={`Add Content Here ${i + 1}`}
                value={item.text}
                onChange={(e) => handleContentChange(i, e.target.value)}
              />
            )}
            {item.file !== undefined && (
              <>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(i, e.target.files[0])}
                />
                {item.file && (
                  <img
                    src={URL.createObjectURL(item.file)}
                    alt={`preview ${i}`}
                    style={{ width: "100px", marginTop: "10px" }}
                  />
                )}
              </>
            )}
            {errors.content && errors.content[i] && (
              <p className="error">{errors.content[i]}</p>
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
