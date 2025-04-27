import React, { useEffect, useState } from "react";
import { getEnrolledCourses } from "./CourseServices";
import CourseCard from "./CourseCard";

function EnrolledCourses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchEnrolled();
  }, []);

  const fetchEnrolled = async () => {
    const response = await getEnrolledCourses("userId123");
    setCourses(response.data);
  };

  return (
    <div>
      <h1>Enrolled Courses</h1>
      {courses.map((course) => (
        <CourseCard key={course.courseId} course={course} showEnroll={false} />
      ))}
    </div>
  );
}

export default EnrolledCourses;
