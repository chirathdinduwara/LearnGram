import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const CourseDetail = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/courses/${courseId}`)
      .then((response) => setCourse(response.data))
      .catch((error) => {
        console.error("Error fetching course:", error);
        setError("Sorry, we couldn't load the course. Please try again later.");
      });
  }, [courseId]);

  if (error) return <p>{error}</p>;
  if (!course) return <p>Loading...</p>;

  return (
    <div>
      <h2>{course.title}</h2>
      <p>{course.description}</p>
      <h4>Content:</h4>
      <ul>
        {course.content &&
          course.content.map((item, index) => <li key={index}>{item}</li>)}
      </ul>
      <p>{course.isPublished ? "Published" : "Draft"}</p>
    </div>
  );
};

export default CourseDetail;
