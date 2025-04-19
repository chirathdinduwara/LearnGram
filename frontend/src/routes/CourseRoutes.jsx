import React from "react";
import CourseDashboard from "../pages/Course/CourseDashboard";
import CourseList from "../components/Course/CourseList";
import CourseForm from "../components/Course/CourseForm";
import MyCourses from "../components/Course/MyCourses";
import EnrolledCourses from "../components/Course/EnrolledCourses";

export default [
  {
    path: "/Course-Dashboard",
    element: <CourseDashboard />,
  },
  {
    path: "/courseList",
    element: <CourseList />,
  },
  {
    path: "/courses/create",
    element: <CourseForm />,
  },
  {
    path: "/my-courses",
    element: <MyCourses />,
  },
  {
    path: "/enrolled",
    element: <EnrolledCourses />,
  },
];
