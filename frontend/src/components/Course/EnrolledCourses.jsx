import React, { useEffect, useState } from "react";
import { getEnrolledCourses, unenrollFromCourse } from "./CourseServices"; // Add unenroll function here
import CourseCard from "./CourseCard";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EnrolledCourses() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEnrolled();
  }, []);

  const fetchEnrolled = async () => {
    try {
      const response = await getEnrolledCourses(
        localStorage.getItem("userEmail")
      );
      setCourses(response.data);
    } catch (error) {
      console.error("Failed to fetch enrolled courses:", error);
    }
  };

  const handleQuit = async (courseId) => {
    const userId = localStorage.getItem("userEmail");
    try {
      const response = await unenrollFromCourse(courseId, userId);
      console.log(response.status);
      if (response.status === 204) {
        toast.success("Successfully unenrolled from course !", {
          className: "instagram-toast",
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
        });
        fetchEnrolled(); // Refresh the list of enrolled courses
      } else {
        toast.eroor("Failed to unenroll from the course.", {
          className: "instagram-toast",
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
        });
      }
    } catch (error) {
      toast.eroor("Error occurred while trying to unenroll.", {
        className: "instagram-toast",
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
      });
      console.error("Unenroll error:", error);
    }
  };

  const goFullCourse = (courseId) => {
    navigate(`/full-course/${courseId}`);
  };

  return (
    <div>
      <h1 style={{ color: "#ffff" }}>Enrolled Courses</h1>
      {courses.map((course) => (
        <div key={course.courseId}>
          <CourseCard course={course} showEnroll={false} onQuit={handleQuit} />
          <button
            className="view-button"
            onClick={() => goFullCourse(course.courseId)}
          >
            View Full Course
          </button>
        </div>
      ))}
      <ToastContainer />
    </div>
  );
}

export default EnrolledCourses;
