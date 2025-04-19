import axios from "axios";

const BASE_URL = "http://localhost:8080/courses";

export const getAllCourses = () => axios.get(BASE_URL);
export const getCourse = (id) => axios.get(`${BASE_URL}/${id}`);
export const createCourse = (data) => axios.post(BASE_URL, data);
export const deleteCourse = (id) => axios.delete(`${BASE_URL}/${id}`);
export const updateCourse = (id, data) =>
  axios.patch(`${BASE_URL}/${id}`, data);
export const enrollCourse = (id) => axios.post(`/enroll/${id}`);
