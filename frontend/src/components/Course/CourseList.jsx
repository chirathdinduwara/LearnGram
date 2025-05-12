import React, { useEffect, useState } from "react";
import { getAllCourses, enrollCourse } from "./CourseServices";
import CourseCard from "./CourseCardCopy";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AllCourses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    const response = await getAllCourses();
    setCourses(response.data);
  };

  const handleEnroll = async (courseId) => {
    await enrollCourse(courseId, localStorage.getItem("userEmail"));
    toast.success("Enrolled Successfully !", {
      className: "instagram-toast",
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
    });
  };

  return (
    <div>
      <h1 style={{ color: "#ffff" }}>All Courses</h1>
      {courses.map((course) => (
        <CourseCard
          key={course.courseId}
          course={course}
          onEnroll={handleEnroll}
        />
      ))}
      <ToastContainer />
    </div>
  );
}

export default AllCourses;
