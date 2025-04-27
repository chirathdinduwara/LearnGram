import axios from "axios";

const BASE_URL = "http://localhost:8080/courses";

export const getAllCourses = () => axios.get(BASE_URL);
export const getCourse = (id) => axios.get(`${BASE_URL}/${id}`);
export const createCourse = (data) => axios.post(BASE_URL, data);
export const deleteCourse = (id, userId) =>
  axios.delete(`${BASE_URL}/${id}`, {
    params: { userId }, // Pass userId as part of the request body
  });

export const updateCourse = (id, data) =>
  axios.patch(`${BASE_URL}/${id}`, data);
export const enrollCourse = (id) => axios.post(`/enroll/${id}`);

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
