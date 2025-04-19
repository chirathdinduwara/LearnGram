import React, { useEffect, useState } from "react";
import axios from "axios";
import CourseForm from "./CourseForm";

const CourseDashboard = () => {
  const [myCourses, setMyCourses] = useState([]);
  const [editingCourse, setEditingCourse] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const currentUserId = "user123"; // replace with actual auth later

  const fetchCourses = async () => {
    try {
      const response = await axios.get("http://localhost:8080/courses");
      const userCourses = response.data.filter(
        (course) => course.createdBy === currentUserId
      );
      setMyCourses(userCourses);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleDelete = async (courseId) => {
    try {
      await axios.delete(`http://localhost:8080/courses/${courseId}`);
      fetchCourses();
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  const handlePublishToggle = async (course) => {
    try {
      const updatedCourse = {
        ...course,
        isPublished: !course.isPublished,
      };
      await axios.patch(
        `http://localhost:8080/courses/${course.courseId}`,
        updatedCourse
      );
      fetchCourses();
    } catch (error) {
      console.error("Error toggling publish state:", error);
    }
  };

  const handleEdit = (course) => {
    setEditingCourse(course);
    setShowForm(true);
  };

  const handleFormSubmit = () => {
    setShowForm(false);
    setEditingCourse(null);
    fetchCourses();
  };

  return (
    <div>
      <h1>My Course Dashboard</h1>
      <button
        onClick={() => {
          setEditingCourse(null);
          setShowForm(true);
        }}
      >
        ➕ Add New Course
      </button>

      {showForm && (
        <CourseForm
          courseId={editingCourse?.courseId}
          existingCourse={editingCourse}
          onSubmit={handleFormSubmit}
        />
      )}

      <hr />
      {myCourses.length === 0 ? (
        <p>You haven’t created any courses yet.</p>
      ) : (
        myCourses.map((course) => (
          <div
            key={course.courseId}
            style={{
              border: "1px solid #ccc",
              margin: "10px 0",
              padding: "10px",
            }}
          >
            <h3>{course.title}</h3>
            <p>{course.description}</p>
            <p>
              Status:{" "}
              <strong>{course.isPublished ? "Published" : "Draft"}</strong>
            </p>

            <button onClick={() => handleEdit(course)}>✏️ Edit</button>
            <button onClick={() => handleDelete(course.courseId)}>
              🗑️ Delete
            </button>
            <button onClick={() => handlePublishToggle(course)}>
              {course.isPublished ? "📥 Unpublish" : "📤 Publish"}
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default CourseDashboard;
