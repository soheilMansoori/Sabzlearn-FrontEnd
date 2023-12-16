import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ArticleBox from "../ArticleBox/ArticleBox";
import SectionHeader from "../SectionHeader/SectionHeader";

import "./LastArticles.css";

export default function LastArticles() {
  const [lastArticles, setLastArticles] = useState(null)

  useEffect(() => {
    fetch('http://localhost:8080/v1/articles')
      .then(res => res.json())
      .then(data => {
        // console.log(data)
        setLastArticles(data)
      })
      .catch(error => console.log(error))
  }, [])

  return (
    <section className="articles">
      <div className="container">
        <SectionHeader
          title="جدیدترین مقاله ها"
          desc="پیش به سوی ارتقای دانش"
          btnTitle="تمامی مقاله ها"
          btnHref="articles/1"
        />

        <div className="articles__content">
          <div className="row">
            {lastArticles && lastArticles.splice(0, 3).map(article => (
              <ArticleBox {...article} key={article._id}/>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
