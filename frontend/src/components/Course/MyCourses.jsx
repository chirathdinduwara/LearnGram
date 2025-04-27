import React, { useEffect, useState } from "react";
import { getAllCourses, deleteCourse } from "./CourseServices";

const MyCourses = () => {
  const [courses, setCourses] = useState([]);

  const loadMyCourses = () => {
    getAllCourses().then((res) => {
      const myCourses = res.data.filter((c) => c.createdBy === "USER1");
      setCourses(myCourses);
    });
  };

  useEffect(() => {
    loadMyCourses();
  }, []);

  const handleDelete = async (id) => {
    await deleteCourse(id);
    loadMyCourses();
  };

  return (
    <>
      <h2>My Courses</h2>
      {courses.map((course) => (
        <div
          key={course.courseId}
          style={{
            marginBottom: "20px",
            border: "1px solid #ccc",
            padding: "10px",
          }}
        >
          <h3>{course.title}</h3>
          <p>{course.description}</p>

          {/* Render course content */}
          {course.content && course.content.length > 0 ? (
            <div>
              {course.content.map((item, index) => (
                <div key={index}>
                  {/* If the content is a URL (image) */}
                  {item && item.startsWith("http") && item.includes("image") ? (
                    <img
                      src={item}
                      alt={`content-${index}`}
                      style={{ width: "100px", margin: "10px" }}
                    />
                  ) : (
                    <p>{item}</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p>No content available</p>
          )}

          {/* Delete button */}
          <button
            onClick={() => handleDelete(course.courseId)}
            style={{ marginTop: "10px" }}
          >
            Delete
          </button>
        </div>
      ))}
    </>
  );
};

export default MyCourses;
