import React, { useState } from "react";
import { createCourse } from "./CourseServices";
import "../../css/Course/CourseForm.css";

const CourseForm = ({ onCourseCreated }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState([""]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createCourse({
      title,
      description,
      content,
      createdBy: "USER1",
    });
    setTitle("");
    setDescription("");
    setContent([""]);
    onCourseCreated();
  };

  const handleContentChange = (i, value) => {
    const updated = [...content];
    updated[i] = value;
    setContent(updated);
  };

  return (
    <div className="course-form-container">
      <form className="course-form" onSubmit={handleSubmit}>
        <h3>Create Course</h3>
        <input
          className="course-form-input"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          className="course-form-input"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <h4>Content Links</h4>
        {content.map((item, i) => (
          <input
            className="course-form-input"
            key={i}
            placeholder={`Content ${i + 1}`}
            value={item}
            onChange={(e) => handleContentChange(i, e.target.value)}
          />
        ))}
        <button
          className="add-content-btn"
          type="button"
          onClick={() => setContent([...content, ""])}
        >
          + Add Content
        </button>
        <button className="course-create-btn" type="submit">
          Create
        </button>
      </form>
    </div>
  );
};

export default CourseForm;
