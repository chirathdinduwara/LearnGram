import React from "react";
import "../../css/Course/CourseCard.css";

function CourseCardCopy({ course, onEnroll, showEnroll = true }) {
  return (
    <div className="course-card">
      <div className="course-card__content">
        <div className="course-card__image">
          {course.content.map(
            (c, index) =>
              c.type === "image" && (
                <img
                  key={index}
                  src={c.value}
                  alt="Course content"
                  className="course-card__image-img"
                />
              )
          )}
        </div>
        <div className="course-card__details">
          <h2 className="course-card__title">{course.title}</h2>
          <p className="course-card__description">{course.description}</p>
          {showEnroll && (
            <button
              className="course-card__enroll-button"
              onClick={() => onEnroll(course.courseId)}
            >
              Enroll
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default CourseCardCopy;
