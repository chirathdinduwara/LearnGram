import React, { useState } from "react";
import axios from "axios";

const CourseForm = ({ courseId, existingCourse, onSubmit }) => {
  const [title, setTitle] = useState(
    existingCourse ? existingCourse.title : ""
  );
  const [description, setDescription] = useState(
    existingCourse ? existingCourse.description : ""
  );
  const [content, setContent] = useState(
    existingCourse ? existingCourse.content : [""]
  );
  const [isPublished, setIsPublished] = useState(
    existingCourse ? existingCourse.isPublished : false
  );
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleContentChange = (index, value) => {
    const updatedContent = [...content];
    updatedContent[index] = value;
    setContent(updatedContent);
  };

  const addContentField = () => {
    setContent([...content, ""]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const courseData = { title, description, content, isPublished };

    try {
      if (courseId) {
        // Update existing course
        await axios.patch(
          `http://localhost:8080/courses/${courseId}`,
          courseData
        );
      } else {
        // Create new course
        await axios.post("http://localhost:8080/courses", courseData);
      }

      setMessage("Course saved successfully!");
      onSubmit();
    } catch (error) {
      console.error(error);
      setMessage("An error occurred while saving the course.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{courseId ? "Update" : "Add"} Course</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <h4>Content</h4>
      {content.map((item, index) => (
        <input
          key={index}
          value={item}
          onChange={(e) => handleContentChange(index, e.target.value)}
          placeholder={`Content ${index + 1}`}
        />
      ))}
      <button type="button" onClick={addContentField}>
        + Add More Content
      </button>

      <label>
        Published
        <input
          type="checkbox"
          checked={isPublished}
          onChange={() => setIsPublished(!isPublished)}
        />
      </label>
      <button type="submit" disabled={loading}>
        {loading ? "Saving..." : courseId ? "Update" : "Add"} Course
      </button>

      {message && <p>{message}</p>}
    </form>
  );
};

export default CourseForm;
