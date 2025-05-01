import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../../css/Course/CourseForm.css";

function CourseUpdateForm() {
  const { courseId } = useParams(); // Get the course ID from URL
  const navigate = useNavigate(); // Use navigate for programmatic navigation

  // State hooks for form fields and course content
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState([]);
  const [tempContent, setTempContent] = useState("");
  const [editingContentIndex, setEditingContentIndex] = useState(null); // State to track which content is being edited

  // Fetch course data on component mount or when courseId changes
  useEffect(() => {
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

  // Add text content to the course
  const handleAddText = () => {
    if (editingContentIndex !== null) {
      // If editing an existing text content, update it
      const updatedContent = [...content];
      updatedContent[editingContentIndex] = {
        type: "text",
        value: tempContent,
      };
      setContent(updatedContent);
      setEditingContentIndex(null); // Clear editing index after update
    } else {
      // If not editing, add new text content
      setContent([...content, { type: "text", value: tempContent }]);
    }
    setTempContent(""); // Reset text input
  };

  // Add image content to the course
  const handleAddImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Basic validation: check if file is an image
      const fileTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!fileTypes.includes(file.type)) {
        alert("Please upload a valid image (JPEG, PNG, GIF).");
        return;
      }

      // Optional: Check file size (e.g., 5MB max)
      if (file.size > 5 * 1024 * 1024) {
        alert("Image size must be less than 5MB.");
        return;
      }

      const url = URL.createObjectURL(file);
      setContent([...content, { type: "image", value: url }]);
    }
  };

  // Delete content from the course
  const handleDeleteContent = (index) => {
    const updatedContent = content.filter((_, i) => i !== index);
    setContent(updatedContent);
  };

  // Edit text content (pre-fill the input with the current content value)
  const handleEditContent = (index) => {
    setTempContent(content[index].value); // Set the tempContent to the content's current value
    setEditingContentIndex(index); // Set the content being edited
  };

  // Process and submit the form to update course data
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate Title and Description
    if (!title.trim()) {
      alert("Please provide a valid course title.");
      return;
    }

    if (!description.trim()) {
      alert("Please provide a valid course description.");
      return;
    }

    // Validate Content - Ensure there is at least one content item
    if (content.length === 0) {
      alert("Please add at least one content item (Text or Image).");
      return;
    }

    // Validate Text Content
    const hasEmptyTextContent = content.some(
      (item) => item.type === "text" && item.value.trim() === ""
    );
    if (hasEmptyTextContent) {
      alert("Text content cannot be empty.");
      return;
    }

    try {
      const processedContent = await processContentImages(content);

      const updatedCourse = {
        title,
        description,
        content: processedContent,
        createdBy: localStorage.getItem("userEmail"),
      };

      // Update course in backend
      await axios.patch(
        `http://localhost:8080/courses/${courseId}`,
        updatedCourse
      );

      alert("Course Updated Successfully!");
      navigate(`/Course-Dashboard`); // Redirect to updated course page
    } catch (error) {
      console.error("Error while updating course:", error);
      alert("There was an error while updating the course.");
    }
  };

  // Helper function to process image content and upload it to the server
  const processContentImages = async (content) => {
    const processedContent = [];

    for (let item of content) {
      if (item.type === "image" && item.value.startsWith("blob:")) {
        const response = await fetch(item.value);
        const blob = await response.blob();
        const formData = new FormData();
        formData.append("image", blob);

        try {
          const imageResponse = await axios.post(
            "http://localhost:8080/courses/CourseImage",
            formData,
            {
              headers: { "Content-Type": "multipart/form-data" },
            }
          );
          const imageUrl = imageResponse.data; // Backend should return the image URL
          processedContent.push({ type: "image", value: imageUrl });
        } catch (err) {
          console.error("Error uploading image:", err);
          alert("Error uploading image.");
        }
      } else {
        processedContent.push(item); // For text content
      }
    }

    return processedContent;
  };

  return (
    <div className="course-container">
      <h1 className="course-title">Update Course</h1>

      {/* Course Title */}
      <input
        className="input-title"
        placeholder="Course Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />

      {/* Course Description */}
      <textarea
        className="input-description"
        placeholder="Course Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <br />

      <h3 className="content-heading">Content:</h3>
      <div className="content-list">
        {/* Render existing content */}
        {content.map((c, i) => (
          <div key={i} className="content-item">
            {c.type === "text" ? (
              <div>
                <p className="content-text">{c.value}</p>
                <button onClick={() => handleEditContent(i)}>Edit</button>
                <button onClick={() => handleDeleteContent(i)}>Delete</button>
              </div>
            ) : (
              <div>
                <img
                  className="content-image"
                  src={c.value}
                  alt="content"
                  width="100"
                />
                <button onClick={() => handleDeleteContent(i)}>Delete</button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add Text Content */}
      <input
        className="input-temp-content"
        placeholder="Add or Edit Text Content"
        value={tempContent}
        onChange={(e) => setTempContent(e.target.value)}
      />
      <button className="btn-add-text" onClick={handleAddText}>
        {editingContentIndex !== null ? "Update Text" : "Add Text"}
      </button>
      <br />

      {/* Add Image Content */}
      <input
        className="input-image-upload"
        type="file"
        accept="image/*"
        onChange={handleAddImage}
      />
      <br />

      {/* Submit Form */}
      <button className="btn-submit" onClick={handleSubmit}>
        Update Course
      </button>
    </div>
  );
}

export default CourseUpdateForm;
