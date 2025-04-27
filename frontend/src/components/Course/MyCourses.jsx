import React, { useEffect, useState } from "react";
import { getMyCourses } from "./CourseServices";
import CourseCard from "./CourseCard";

function MyCourses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    const response = await getMyCourses(localStorage.getItem("userEmail"));
    setCourses(response.data);
  };

  return (
    <div>
      <h1>My Courses</h1>
      {courses.map((course) => (
        <CourseCard key={course.courseId} course={course} showEnroll={false} />
      ))}
    </div>
  );
}

export default MyCourses;
