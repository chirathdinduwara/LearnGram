import React from "react";
import CourseForm from "../../components/Course/CourseForm";
import CourseList from "../../components/Course/CourseList";
import MyCourses from "../../components/Course/MyCourses";
import EnrolledCourses from "../../components/Course/EnrolledCourses";

function CourseDashboard() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>LearnGram - Course Platform</h1>
      <CourseForm onCourseCreated={() => window.location.reload()} />
      <MyCourses />
      <EnrolledCourses />
      <CourseList />
    </div>
  );
}

export default CourseDashboard;
