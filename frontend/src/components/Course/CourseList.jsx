import React, { useEffect, useState } from "react";
import axios from "axios";

const CourseList = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Fetch courses from the backend
    axios.get("http://localhost:8080/courses")
      .then((response) => setCourses(response.data))
      .catch((error) => console.error("Error fetching courses:", error));
  }, []);

  return (
    <div>
      <h2>All Courses</h2>
      <ul>
        {courses.map((course) => (
          <li key={course.courseId}>
            <h3>{course.title}</h3>
            <p>{course.description}</p>
            <p>{course.isPublished ? "Published" : "Draft"}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseList;
