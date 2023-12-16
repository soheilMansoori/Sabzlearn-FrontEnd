import React, { useEffect, useState } from "react";
import Topbar from "../../Components/Topbar/Topbar";
import Navbar from "../../Components/Navbar/Navbar";
import Breadcrumb from "../../Components/Breadcrumb/Breadcrumb";
import Footer from "../../Components/Footer/Footer";
import CourseBox from "../../Components/CourseBox/CourseBox";

import "./Courses.css";
import Pagination from "../../Components/Pagination/Pagination";

export default function Courses() {
  const [allCourses, setAllCourses] = useState([])
  const [showCourses, setShowCourses] = useState([])


  useEffect(() => {
    fetch('http://localhost:8080/v1/courses')
      .then(res => res.json())
      .then(data => {
        // console.log(data)
        setAllCourses(data)
      })
      .catch(error => console.log(error))
  }, [])


  return (
    <>
      <Topbar />
      <Navbar />

      <Breadcrumb
        links={[
          { id: 1, title: "خانه", to: "" },
          {
            id: 2,
            title: "تمامی دوره ها",
            to: "courses",
          },
        ]}
      />

      {/* <!--------------------------------  Courses-Section  --------------------------------> */}
      <section className="courses">
        <div className="container">
          <div className="courses-content">
            <div className="container">
              <div className="row">
                {allCourses.length ? (
                  <>
                    {showCourses && showCourses.map(course => (
                      <CourseBox {...course} key={course._id}/>
                    ))}
                    <Pagination
                      items={allCourses}
                      itemsCount={3}
                      pathname='/courses'
                      setShowItems={setShowCourses}
                    />
                  </>
                ) : (
                  <div className='alert alert-warning'>دوره ایی یافت نشد</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!--------------------------------  Courses-Section  --------------------------------> */}

      <Footer />
    </>
  );
}
