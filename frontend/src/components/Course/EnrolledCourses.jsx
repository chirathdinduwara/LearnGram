import React, { useEffect, useState } from "react";
import { getEnrolledCourses } from "./CourseServices";
import CourseCard from "./CourseCard";

function EnrolledCourses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchEnrolled();
  }, []);

  const fetchEnrolled = async () => {
    const response = await getEnrolledCourses(
      localStorage.getItem("userEmail")
    );
    setCourses(response.data);
  };

  return (
    <div>
      <h1 style={{ color: "#ffff" }}>Enrolled Courses</h1>
      {courses.map((course) => (
        <CourseCard key={course.courseId} course={course} showEnroll={false} />
      ))}
    </div>
  );
}

export default EnrolledCourses;
