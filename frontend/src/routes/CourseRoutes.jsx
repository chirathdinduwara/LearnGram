import React from "react";
import CourseList from "../components/Course/CourseList";
import CourseForm from "../pages/Course/CourseForm";
import CourseDetail from "../components/Course/CourseDetail";
import CourseDashboard from "../pages/Course/CourseDashboard";

export default [
  {
    path: "/courseDashboard",
    element: <CourseDashboard />,
  },
  {
    path: "/courseList",
    element: <CourseList />,
  },
  {
    path: "/courses/add",
    element: <CourseForm />,
  },
  {
    path: "/courses/:courseId",
    element: <CourseDetail />,
  },
  {
    path: "/courses/edit/:courseId",
    element: <CourseForm />,
  },
];
