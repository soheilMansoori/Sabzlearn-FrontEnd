import React, { useEffect, useState } from "react";
import CourseBox from "../CourseBox/CourseBox";
import SectionHeader from "../SectionHeader/SectionHeader";

import "./LastCourses.css";

export default function LastCourses() {
  const [lastCourses, setLastCourses] = useState(null)
  useEffect(() => {
    fetch('http://localhost:8080/v1/courses')
      .then(res => res.json())
      .then(data => {
        // console.log(data)
        setLastCourses(data)
      })
      .catch(error => console.log(error))
  }, [])
  return (
    <>
      <div className="courses">
        <div className="container">
          <SectionHeader
            title="جدیدترین دوره ها"
            desc="سکوی پرتاپ شما به سمت موفقیت"
            btnTitle="تمامی دوره ها"
            btnHref='courses/1'
          />

          <div className="courses-content">
            <div className="container">
              <div className="row">
                {lastCourses && lastCourses.splice(0, 6).map(cours => (
                  <CourseBox {...cours} key={cours._id} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
