import React, { useEffect, useState } from "react";
import { getMyCourses } from "./CourseServices";
import axios from "axios";
import CourseCard from "./CourseCard";
import { CgTrash, CgPen } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

function MyCourses() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await getMyCourses(localStorage.getItem("userEmail"));
      setCourses(response.data);
    } catch (error) {
      console.error("Failed to fetch courses", error);
    }
  };

  const handleDelete = async (courseId) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/courses/${courseId}`
      );
      if (response.status === 204) {
        setMessage("Course deleted successfully.");
        // Refresh course list
        fetchCourses();
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setMessage("Course not found.");
      } else {
        setMessage("An error occurred while deleting the course.");
      }
    }
  };

  const handleEdit = (courseId) => {
    navigate(`/courses/update/${courseId}`);
  };

  return (
    <div>
      <h1>My Courses</h1>
      <p>{message}</p>
      {courses.map((course) => (
        <div
          key={course.courseId}
          style={{ display: "flex", alignItems: "center" }}
        >
          <CourseCard course={course} showEnroll={false} />
          <div className="button-group">
            <button
              className="delete-c-btn"
              onClick={() => handleDelete(course.courseId)}
            >
              <CgTrash className="delete-c-icon" />
            </button>
            <button
              className="edit-c-btn"
              onClick={() => handleEdit(course.courseId)}
            >
              <CgPen className="edit-c-icon" />
            </button>
          </div>
        </div>
      ))}
      <button onClick={openModal}>Open Popup</button>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-btn" onClick={closeModal}>
              X
            </span>
            <h2>Popup Content</h2>
            <p>This is a simple popup modal.</p>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyCourses;
