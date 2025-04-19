import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const CourseDetail = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/courses/${courseId}`)
      .then((response) => setCourse(response.data))
      .catch((error) => console.error("Error fetching course:", error));
  }, [courseId]);

  if (!course) return <p>Loading...</p>;

  return (
    <div>
      <h2>{course.title}</h2>
      <p>{course.description}</p>
      <p>{course.content}</p>
      <p>{course.isPublished ? "Published" : "Draft"}</p>
    </div>
  );
};

export default CourseDetail;
