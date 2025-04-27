import React, { useEffect, useState } from "react";
import { getMyCourses } from "./CourseServices";
import axios from "axios";
import CourseCard from "./CourseCard";
import { CgTrash } from "react-icons/cg";

function MyCourses() {
  const [courses, setCourses] = useState([]);
  const [message, setMessage] = useState("");

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
          <button
            className="delete-c-btn"
            onClick={() => handleDelete(course.courseId)}
          >
            <CgTrash className="delete-c-icon" />
          </button>
        </div>
      ))}
    </div>
  );
}

export default MyCourses;
