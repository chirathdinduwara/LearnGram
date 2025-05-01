import React, { useEffect, useState } from "react";
import { getAllCourses, enrollCourse } from "./CourseServices";
import CourseCard from "./CourseCardCopy";

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
    alert("Enrolled Successfully!");
  };

  return (
    <div>
      <h1 style={{color:"#ffff"}}>All Courses</h1>
      {courses.map((course) => (
        <CourseCard
          key={course.courseId}
          course={course}
          onEnroll={handleEnroll}
        />
      ))}
    </div>
  );
}

export default AllCourses;
