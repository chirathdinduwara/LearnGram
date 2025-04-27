import React from "react";
import CourseDashboard from "../pages/Course/CourseDashboard";
import CourseList from "../components/Course/CourseList";
import CourseForm from "../components/Course/Course_From";
import MyCourses from "../components/Course/MyCourses";
import EnrolledCourses from "../components/Course/EnrolledCourses";

const CourseRoutes = [
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

export default CourseRoutes;