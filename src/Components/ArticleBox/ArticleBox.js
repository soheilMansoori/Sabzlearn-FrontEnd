import React from "react";
import { Link } from "react-router-dom";

import "./ArticleBox.css";

export default function ArticleBox({ title, description, cover, shortName }) {
  return (
    <div className="col-4">
      <div className="article-card">
        <div className="article-card__header">
          <Link to={`/article-info/${shortName}`} className="article-card__link-img">
            <div>
              <img
                src={cover}
                className="article-card__img"
                alt="Article Cover"
              />
            </div>
          </Link>
        </div>
        <div className="article-card__content">
          <a href="#" className="article-card__link">
            {title}
          </a>
          <p className="article-card__text">
            {description}
          </p>
          <Link to={`/article-info/${shortName}`} className="article-card__btn">
            بیشتر بخوانید
          </Link>
        </div>
      </div>
    </div>
  );
}
