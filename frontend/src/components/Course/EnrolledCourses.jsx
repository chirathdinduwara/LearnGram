import React, { useEffect, useState } from "react";
import { getEnrolledCourses, unenrollFromCourse } from "./CourseServices"; // Add unenroll function here
import CourseCard from "./CourseCard";
import { useNavigate } from "react-router-dom";

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
        alert("Successfully unenrolled from course!");
        fetchEnrolled(); // Refresh the list of enrolled courses
      } else {
        alert("Failed to unenroll from the course.");
      }
    } catch (error) {
      alert("Error occurred while trying to unenroll.");
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
        <div>
          <div key={course.courseId}>
            <CourseCard
              course={course}
              showEnroll={false}
              onQuit={handleQuit}
            />
          </div>
          <button onClick={() => goFullCourse(course.courseId)}>View Full Course</button>
        </div>
      ))}
    </div>
  );
}

export default EnrolledCourses;
