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
    existingCourse ? existingCourse.content : ""
  );
  const [isPublished, setIsPublished] = useState(
    existingCourse ? existingCourse.isPublished : false
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    const courseData = { title, description, content, isPublished };

    if (courseId) {
      // Update existing course
      await axios.patch(`http://localhost:8080/courses/${courseId}`, courseData);
    } else {
      // Create new course
      await axios.post("http://localhost:8080/courses", courseData);
    }

    onSubmit();
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
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <label>
        Published
        <input
          type="checkbox"
          checked={isPublished}
          onChange={() => setIsPublished(!isPublished)}
        />
      </label>
      <button type="submit">{courseId ? "Update" : "Add"} Course</button>
    </form>
  );
};

export default CourseForm;
