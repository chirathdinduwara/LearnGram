import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetCouseByID } from "./CourseServices";
import "../../css/Course/FullCoursePage.css";
import { useNavigate } from "react-router-dom";

function FullCoursePage() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourseDetails();
  }, []);

  const fetchCourseDetails = async () => {
    try {
      const response = await GetCouseByID(courseId);
      setCourse(response.data);
    } catch (error) {
      console.error("Failed to fetch course:", error);
    }
  };

  return (
    <div className="course-container">
      <button onClick={() => navigate(-1)}>Go Back</button>
      <br />
      <br />
      {course ? (
        <div className="course-content-wrapper">
          <h1 className="course-title">{course.title}</h1>
          <p className="course-description">{course.description}</p>

          <h2 className="course-section-header">Course Content:</h2>
          <div className="course-materials">
            {course.content.map((item, index) => {
              switch (item.type) {
                case "text":
                  return (
                    <p key={index} className="course-text-block">
                      {item.value}
                    </p>
                  );
                case "image":
                  return (
                    <img
                      key={index}
                      src={item.value}
                      alt={`course-img-${index}`}
                      className="course-image"
                    />
                  );
                case "video":
                  return (
                    <video key={index} controls className="course-video">
                      <source src={item.value} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  );
                default:
                  return null;
              }
            })}
          </div>
        </div>
      ) : (
        <p className="loading-message">Loading course details...</p>
      )}
    </div>
  );
}

export default FullCoursePage;
