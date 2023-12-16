import React, { useEffect, useState } from "react";
import Topbar from "./../../Components/Topbar/Topbar";
import Navbar from "./../../Components/Navbar/Navbar";
import Footer from "./../../Components/Footer/Footer";
import { useParams } from "react-router-dom";
import SectionHeader from "../../Components/SectionHeader/SectionHeader";
import CourseBox from "../../Components/CourseBox/CourseBox";
import ArticleBox from "../../Components/ArticleBox/ArticleBox";

export default function Search() {
  const [courses, setCourses] = useState([]);
  const [articles, setArticles] = useState([]);
  const { searchValue } = useParams();

  useEffect(() => {
    fetch(`http://localhost:8080/v1/search/${searchValue}`)
      .then((res) => res.json())
      .then((allData) => {
        // console.log(allData);
        setArticles(allData.allResultArticles);
        setCourses(allData.allResultCourses);
      }).catch(error => console.log(error))
  }, []);

  return (
    <>
      <Topbar />
      <Navbar />
      <div className="courses">
        <div className="container">
          <SectionHeader
            title="نتیجه دوره‌ها برای جستجوی شما"
            desc="سکوی پرتاپ شما به سمت موفقیت"
          />
          <div className="courses-content">
            <div className="container">
              <div className="row">
                {courses.length ? (
                  <>
                    {courses.map((course) => (
                      <CourseBox {...course} key={course._id}/>
                    ))}
                  </>
                ) : (
                  <div className="alert alert-warning">
                    دوره‌ای برای جستجوی شما وجود ندارد
                  </div>

                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="courses">
        <div className="container">
          <SectionHeader
            title="نتیجه مقالات برای جستجوی شما"
            desc="پیش به سوی ارتقای دانش"
          />
          <div className="articles__content">
            <div className="row">
              {articles.length ? (
                <>
                  {articles.map((article) => (
                    <ArticleBox {...article} key={article._id} />
                  ))}
                </>

              ) : (
                <div className="alert alert-warning">
                  مقاله‌ای برای جستجوی شما وجود ندارد
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
