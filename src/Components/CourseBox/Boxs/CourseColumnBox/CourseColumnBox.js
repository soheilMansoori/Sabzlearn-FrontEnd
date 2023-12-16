import React from 'react'
import { Link } from 'react-router-dom'
import CircleSpinner from '../../../CircleSpinner/CircleSpinner'
import './CourseColumnBox.css'


export default function CourseColumnBox({ name, cover, shortName, creator, price, isSlider, isImgShow, onImageError, onImageLoaded }) {
    return (
        <div className="col-4" style={{ width: isSlider && '100%' }}>
            <div className="course-box">
                <Link to={`/course-info/${shortName}`}>
                    <img
                        src={cover}
                        // src="https://placeimg.com/295/295/any/tech?t=190129384"
                        alt={name}
                        className="course-box__img"
                        onLoad={onImageLoaded}
                        onError={onImageError}
                    />
                    {
                        !isImgShow && (
                            <CircleSpinner />
                        )
                    }
                </Link>
                <div className="course-box__main">
                    <Link to={`/course-info/${shortName}`} className="course-box__title">
                        {name}
                    </Link>

                    <div className="course-box__rating-teacher">
                        <div className="course-box__teacher">
                            <i className="fas fa-chalkboard-teacher course-box__teacher-icon"></i>
                            <a href="#" className="course-box__teacher-link">
                                {creator}
                            </a>
                        </div>
                        <div className="course-box__rating">
                            <img
                                src="/images/svgs/star.svg"
                                alt="rating"
                                className="course-box__star"
                            />
                            <img
                                src="/images/svgs/star_fill.svg"
                                alt="rating"
                                className="course-box__star"
                            />
                            <img
                                src="/images/svgs/star_fill.svg"
                                alt="rating"
                                className="course-box__star"
                            />
                            <img
                                src="/images/svgs/star_fill.svg"
                                alt="rating"
                                className="course-box__star"
                            />
                            <img
                                src="/images/svgs/star_fill.svg"
                                alt="rating"
                                className="course-box__star"
                            />
                        </div>
                    </div>

                    <div className="course-box__status">
                        <div className="course-box__users">
                            <i className="fas fa-users course-box__users-icon"></i>
                            <span className="course-box__users-text">500</span>
                        </div>
                        <span className="course-box__price">{price === 0 ? 'رایگان' : price.toLocaleString()}</span>
                    </div>
                </div>

                <div className="course-box__footer">
                    <Link to={`/course-info/${shortName}`} className="course-box__footer-link">
                        مشاهده اطلاعات
                        <i className="fas fa-arrow-left course-box__footer-icon"></i>
                    </Link>
                </div>
            </div>
        </div>

    )
}
