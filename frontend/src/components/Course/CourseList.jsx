import React, { useEffect, useState } from "react";
import axios from "axios";

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/courses")
      .then((response) => setCourses(response.data))
      .catch((error) => {
        console.error("Error fetching courses:", error);
        setError(
          "Sorry, we couldn't load the courses. Please try again later."
        );
      });
  }, []);

  if (error) return <p>{error}</p>;
  if (courses.length === 0) return <p>Loading...</p>;

  return (
    <div>
      <h2>All Courses</h2>
      <h3>Published Courses</h3>
      <ul>
        {courses
          .filter((course) => course.isPublished)
          .map((course) => (
            <li key={course.courseId}>
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <p>{course.isPublished ? "Published" : "Draft"}</p>
            </li>
          ))}
      </ul>

      <h3>Draft Courses</h3>
      <ul>
        {courses
          .filter((course) => !course.isPublished)
          .map((course) => (
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
