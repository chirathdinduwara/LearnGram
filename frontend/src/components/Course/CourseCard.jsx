import React from "react";
import "../../css/Course/CourseCard.css";

function CourseCard({ course, onQuit, showEnroll = true }) {
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

          {course.content.map(
            (c, index) =>
              c.type === "text" && (
                <a key={index} className="course-card__text" href={c.value}>
                  {c.value}
                </a>
              )
          )}

          {showEnroll && (
            <button
              className="course-card__enroll-button"
              onClick={() => onEnroll(course.courseId)}
              disabled={isEnrolled}
            >
              {isEnrolled ? "Enrolled" : "Enroll"}
            </button>
          )}

          {onQuit && (
            <button
              className="course-card__quit-button"
              onClick={() => onQuit(course.courseId)} // Ensure this works correctly
              style={{
                marginLeft: "1px",
                backgroundColor: "crimson",
                color: "white",
              }}
            >
              UnEnrolled
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default CourseCard;
