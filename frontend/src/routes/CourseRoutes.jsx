import React from "react";
import CourseDashboard from "../pages/Course/CourseDashboard";
import CourseList from "../components/Course/CourseList";
import CourseForm from "../components/Course/Course_From";
import CourseUpdateForm from "../components/Course/Edit_Course_From";
import MyCourses from "../components/Course/MyCourses";
import EnrolledCourses from "../components/Course/EnrolledCourses";
import FullCoursePage from "../components/Course/FullCoursePage";

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
    path: "/courses/update/:courseId",
    element: <CourseUpdateForm />,
  },
  {
    path: "/my-courses",
    element: <MyCourses />,
  },
  {
    path: "/full-course/:courseId",
    element: <FullCoursePage />,
  },
  {
    path: "/enrolled",
    element: <EnrolledCourses />,
  },
];

export default CourseRoutes;
