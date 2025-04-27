import React from 'react';

function CourseCard({ course, onEnroll, showEnroll = true }) {
  return (
    <div style={{ border: '1px solid gray', padding: '10px', margin: '10px' }}>
      <h2>{course.title}</h2>
      <p>{course.description}</p>

      {course.content.map((c, index) => (
        <div key={index}>
          {c.type === 'text' ? (
            <p>{c.value}</p>
          ) : (
            <img src={c.value} alt="Course content" width="200" />
          )}
        </div>
      ))}

      {showEnroll && (
        <button onClick={() => onEnroll(course.courseId)}>
          Enroll
        </button>
      )}
    </div>
  );
}

export default CourseCard;
