import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate instead of useHistory
import "../../css/Course/CourseForm.css";

function CourseUpdateForm() {
  const { courseId } = useParams(); // To get the course ID from the URL
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState([]);
  const [tempContent, setTempContent] = useState("");
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  useEffect(() => {
    // Fetch course details by ID when the component mounts
    const fetchCourseData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/courses/${courseId}`
        );
        const courseData = response.data;
        setTitle(courseData.title);
        setDescription(courseData.description);
        setContent(courseData.content);
      } catch (error) {
        console.error("Error fetching course data:", error);
        alert("Failed to load course data.");
      }
    };

    fetchCourseData();
  }, [courseId]);

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

      const updatedCourse = {
        title,
        description,
        content: processedContent,
        createdBy: localStorage.getItem("userEmail"),
      };

      await axios.patch(
        `http://localhost:8080/courses/${courseId}`,
        updatedCourse
      );

      alert("Course Updated Successfully!");
      navigate(`/courses/${courseId}`); // Redirect to the updated course page using navigate
    } catch (error) {
      console.error("Error while updating course:", error);
      alert("There was an error while updating the course.");
    }
  };

  return (
    <>
      <div className="course-container">
        <h1 className="course-title">Update Course</h1>

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
          Update Course
        </button>
      </div>
    </>
  );
}

export default CourseUpdateForm;
