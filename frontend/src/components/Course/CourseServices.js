import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:8080' }); // your backend URL

export const createCourse = (courseData) => API.post('/courses', courseData);
export const UploadImage = (courseData) => API.post('/CourseImage', courseData);
export const getMyCourses = (userId) => API.get(`/courses/user/${userId}`);
export const getAllCourses = () => API.get('/courses');
export const enrollCourse = (courseId, userId) => API.post(`/courses/${courseId}/enroll`, { userId });
export const getEnrolledCourses = (userId) => API.get(`/courses/enrolled/${userId}`);
export const updateCourse = (courseId, updatedData) => API.patch(`/courses/${courseId}`, updatedData);

/*
Create Course = http://localhost:8080/courses
sample body:
{
  "title": "Java Masterclass",
  "description": "Learn Java from scratch to advanced.",
  "content": [
    "Introduction to Java",
    "OOP Concepts",
    "Multithreading",
    "File I/O",
    "Spring Boot Basics"
  ],
  "createdBy": "user123"
}

...............................
Get All Courses = http://localhost:8080/courses
...............................
Get My Courses = http://localhost:8080/courses/my?userId=user123
...............................
Get Enrolled Courses = http://localhost:8080/courses/enrolled?userId=user123
...............................
Get Course by ID = http://localhost:8080/courses/{courseId}
...............................
Enroll in a Course = http://localhost:8080/courses/{courseId}/enroll?userId=user456
...............................
Update a Course = http://localhost:8080/courses/{courseId}?userId=user123
sample body:
{
  "title": "Java Masterclass - Updated",
  "description": "Full-stack Java Developer course",
  "content": [
    "Intro",
    "OOP",
    "Spring Boot",
    "Microservices"
  ]
}
...............................
Delete Course (only by creator) = http://localhost:8080/courses/{courseId}?userId=user123


*/
