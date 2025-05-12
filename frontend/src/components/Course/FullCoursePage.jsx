import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetCouseByID } from "./CourseServices";

function FullCoursePage() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);

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
    <div style={{ padding: "20px" }}>
      {course ? (
        <div>
          <h1>{course.title}</h1>
          <p>{course.description}</p>

          <h2>Course Content:</h2>
          <div>
            {course.content.map((item, index) => {
              switch (item.type) {
                case "text":
                  return (
                    <p key={index} style={{ margin: "1em 0" }}>
                      {item.value}
                    </p>
                  );
                case "image":
                  return (
                    <img
                      key={index}
                      src={item.value}
                      alt={`course-img-${index}`}
                      style={{ maxWidth: "100%", margin: "1em 0" }}
                    />
                  );
                case "video":
                  return (
                    <video
                      key={index}
                      controls
                      style={{ maxWidth: "100%", margin: "1em 0" }}
                    >
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
        <p>Loading course details...</p>
      )}
    </div>
  );
}

export default FullCoursePage;
