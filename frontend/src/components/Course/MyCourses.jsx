import React, { useEffect, useState } from "react";
import { getMyCourses } from "./CourseServices";
import axios from "axios";
import CourseCard from "./CourseCard";
import { CgTrash, CgPen, CgOptions } from "react-icons/cg";
import { BsThreeDots } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function MyCourses() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [message, setMessage] = useState("");
  const [activeCourseId, setActiveCourseId] = useState(null); // ID of course whose options are open

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
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this course?"
    );
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(
        `http://localhost:8080/courses/${courseId}`
      );
      if (response.status === 204) {
        toast.success("Course deleted successfully.", {
          className: "instagram-toast",
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
        });
        setActiveCourseId(null); // Close the popup
        fetchCourses();
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error("Course not found.", {
          className: "instagram-toast",
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
        });
      } else {
        toast.error("An error occurred while deleting the course.");
      }
    }
  };

  const handleEdit = (courseId) => {
    navigate(`/courses/update/${courseId}`);
  };

  return (
    <div>
      <h1 style={{ color: "#ffff" }}>My Courses</h1>
      <p>{message}</p>
      {courses.map((course) => (
        <div
          key={course.courseId}
          style={{
            display: "flex",
            alignItems: "center",
            position: "relative",
          }}
        >
          <CourseCard course={course} showEnroll={false} />
          <div
            className="three-dots"
            onClick={() =>
              setActiveCourseId(
                activeCourseId === course.courseId ? null : course.courseId
              )
            }
            style={{ cursor: "pointer", marginLeft: "-5px" }}
          >
            <BsThreeDots />
          </div>

          {activeCourseId === course.courseId && (
            <div
              className="popup-overlay"
              onClick={() => setActiveCourseId(null)}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0,0,0,0.3)",
              }}
            >
              <div
                className="popup-content"
                onClick={(e) => e.stopPropagation()}
                style={{
                  padding: "10px",
                  borderRadius: "5px",
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <ul style={{ listStyle: "none", padding: 0 }}>
                  <button
                    className="edit-c-btn"
                    onClick={() => handleEdit(course.courseId)}
                  >
                    <CgPen className="edit-c-icon" /> Edit
                  </button>
                  <button
                    className="delete-c-btn"
                    onClick={() => handleDelete(course.courseId)}
                  >
                    <CgTrash className="delete-c-icon" /> Delete
                  </button>
                </ul>
              </div>
            </div>
          )}
        </div>
      ))}
      <ToastContainer />
    </div>
  );
}

export default MyCourses;
