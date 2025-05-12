import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../../css/Course/CourseForm.css";

function CourseUpdateForm() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState([]);
  const [tempContent, setTempContent] = useState("");
  const [editingContentIndex, setEditingContentIndex] = useState(null);

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

  const handleAddText = () => {
    if (tempContent.trim() === "") return;

    if (editingContentIndex !== null) {
      const updated = [...content];
      updated[editingContentIndex] = { type: "text", value: tempContent };
      setContent(updated);
      setEditingContentIndex(null);
    } else {
      setContent([...content, { type: "text", value: tempContent }]);
    }

    setTempContent("");
  };

  const handleAddImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!["image/jpeg", "image/png", "image/gif"].includes(file.type)) {
        alert("Please upload a valid image (JPEG, PNG, GIF).");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert("Image size must be less than 5MB.");
        return;
      }
      const url = URL.createObjectURL(file);
      setContent([...content, { type: "image", value: url, file }]);
    }
  };

  const handleAddVideo = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("video/")) {
        alert("Please upload a valid video file.");
        return;
      }
      if (file.size > 100 * 1024 * 1024) {
        alert("Video size must be less than 100MB.");
        return;
      }
      const url = URL.createObjectURL(file);
      setContent([...content, { type: "video", value: url, file }]);
    }
  };

  const handleDeleteContent = (index) => {
    const updated = [...content];
    updated.splice(index, 1);
    setContent(updated);
    if (editingContentIndex === index) {
      setTempContent("");
      setEditingContentIndex(null);
    }
  };

  const handleEditContent = (index) => {
    if (content[index].type === "text") {
      setTempContent(content[index].value);
      setEditingContentIndex(index);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim() || content.length === 0) {
      alert("Please complete all fields and add at least one content item.");
      return;
    }

    const hasEmptyText = content.some(
      (item) => item.type === "text" && item.value.trim() === ""
    );
    if (hasEmptyText) {
      alert("Text content cannot be empty.");
      return;
    }

    try {
      const processedContent = await processMediaUploads(content);

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
      navigate(`/Course-Dashboard`);
    } catch (error) {
      console.error("Update error:", error);
      alert("Failed to update course.");
    }
  };

  const processMediaUploads = async (contentArray) => {
    const updated = [];

    for (let item of contentArray) {
      if (
        (item.type === "image" || item.type === "video") &&
        item.value.startsWith("blob:")
      ) {
        const response = await fetch(item.value);
        const blob = await response.blob();
        const formData = new FormData();
        formData.append(item.type, blob);

        const endpoint =
          item.type === "image"
            ? "http://localhost:8080/courses/CourseImage"
            : "http://localhost:8080/courses/CourseVideo";

        const uploadRes = await axios.post(endpoint, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        updated.push({ type: item.type, value: uploadRes.data });
      } else {
        updated.push(item);
      }
    }

    return updated;
  };

  return (
    <div className="course-container">
      <h1 className="course-title">Update Course</h1>

      <input
        className="input-title"
        placeholder="Course Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />

      <textarea
        className="input-description"
        placeholder="Course Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <br />

      <h3 className="content-heading">Content:</h3>
      <div className="content-list">
        {content.map((c, i) => (
          <div key={i} className="content-item">
            {c.type === "text" ? (
              <>
                <p className="content-text">{c.value}</p>
                <button onClick={() => handleEditContent(i)}>Edit</button>
              </>
            ) : c.type === "image" ? (
              <img src={c.value} alt="content" width="100" />
            ) : c.type === "video" ? (
              <video src={c.value} controls width="200" />
            ) : null}
            <button onClick={() => handleDeleteContent(i)}>Delete</button>
          </div>
        ))}
      </div>

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

      <input
        className="input-image-upload"
        type="file"
        accept="image/*"
        onChange={handleAddImage}
      />
      <br />

      <input
        className="input-video-upload"
        type="file"
        accept="video/*"
        onChange={handleAddVideo}
      />
      <br />

      <button className="btn-submit" onClick={handleSubmit}>
        Update Course
      </button>
    </div>
  );
}

export default CourseUpdateForm;
