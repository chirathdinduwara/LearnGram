import React, { useEffect, useState } from "react";
import { getAllCourses } from "./CourseServices";

const CourseList = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    getAllCourses().then((res) => setCourses(res.data));
  }, []);

  return (
    <>
      <h2>All Courses</h2>
      {courses.map((course) => (
        <div key={course.courseId}>
          <h3>{course.title}</h3>
          <p>{course.description}</p>
          <ul>
            {course.content.map((item, i) => (
              <li key={i}>
                <a href={item} target="_blank">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
};

export default CourseList;
