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
        <div key={course.courseId}>
          <h3>{course.title}</h3>
          <p>{course.description}</p>
          <button onClick={() => handleDelete(course.courseId)}>Delete</button>
        </div>
      ))}
    </>
  );
};

export default MyCourses;
