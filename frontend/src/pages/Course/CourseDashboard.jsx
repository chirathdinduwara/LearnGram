import React, { useState } from "react";
import CourseForm from "../../components/Course/Course_From"; //oni na danata
import CourseList from "../../components/Course/CourseList";
import MyCourses from "../../components/Course/MyCourses";
import EnrolledCourses from "../../components/Course/EnrolledCourses";
import "../../css/Course/CourseDashboard.css";

function CourseDashboard() {
  const [activeTab, setActiveTab] = useState("tab1");
  return (
    <>
      <div className="dashboard-sections">
        <h2>LearnGram - Course-Section</h2>
        <div className="tabs-bar">
          <button className="tab-btn" onClick={() => setActiveTab("tab1")}>
            All Courses
          </button>
          <button className="tab-btn" onClick={() => setActiveTab("tab2")}>
            My courses
          </button>
          <button className="tab-btn" onClick={() => setActiveTab("tab3")}>
            Enrolled Courses
          </button>
        </div>

        {activeTab === "tab1" && (
          <section className="sec">
            <CourseList />
          </section>
        )}

        {activeTab === "tab2" && (
          <section className="sec">
            <MyCourses />
          </section>
        )}

        {activeTab === "tab3" && (
          <section className="sec">
            <EnrolledCourses />
          </section>
        )}
      </div>
    </>
  );
}

export default CourseDashboard;
