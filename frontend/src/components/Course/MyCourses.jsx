import React, { useEffect, useState } from "react";
import { getAllCourses, deleteCourse } from "./CourseServices";

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const userId = "USER1"; // Assuming the user ID is static or comes from a login context.

  // Load courses from the API
  const loadMyCourses = () => {
    setLoading(true); // Set loading state to true
    getAllCourses()
      .then((res) => {
        const myCourses = res.data.filter((c) => c.createdBy === userId); // Adjust the filtering based on the logged-in user
        setCourses(myCourses); // Set the courses in state
      })
      .catch((err) => {
        console.error("Error loading courses:", err); // Log errors if they occur
      })
      .finally(() => {
        setLoading(false); // Set loading state to false after the request is finished
      });
  };

  // Fetch the courses when the component mounts
  useEffect(() => {
    loadMyCourses();
  }, []);

  // Handle the deletion of a course
  const handleDelete = async (id) => {
    try {
      // Pass the userId as a query parameter for deletion
      await deleteCourse(id, userId); // Ensure deleteCourse handles both courseId and userId
      loadMyCourses(); // Reload courses after deletion
    } catch (error) {
      console.error("Failed to delete course:", error); // Log any errors
    }
  };

  // If courses are still loading, show a loading message
  if (loading) {
    return <p>Loading your courses...</p>;
  }

  return (
    <>
      <h2>My Courses</h2>
      {courses.length === 0 ? (
        <p>You have no courses.</p> // Show message if no courses are found
      ) : (
        courses.map((course) => (
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
                    {item &&
                    item.startsWith("http") &&
                    item.includes("image") ? (
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

            {/* Delete button with confirmation */}
            <button
              onClick={() => {
                if (
                  window.confirm(
                    `Are you sure you want to delete the course "${course.title}"?`
                  )
                ) {
                  handleDelete(course.courseId); // Pass courseId to delete
                }
              }}
              style={{ marginTop: "10px" }}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </>
  );
};

export default MyCourses;
