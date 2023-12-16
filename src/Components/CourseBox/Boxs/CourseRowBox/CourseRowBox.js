import React from 'react'
import { Link } from 'react-router-dom'
import CircleSpinner from '../../../CircleSpinner/CircleSpinner'
import './CourseRowBox.css'
export default function CourseRowBox({ name, cover, shortName, creator, price, description, isImgShow, onImageError, onImageLoaded }) {
    return (
        <div className="col-12">
            <div className="course-box">
                <div className="course__box-header">
                    <div className="course__box-right">
                        <Link to={`/course-info/${shortName}`} className="course__box-right-link">
                            <img
                                src={cover}
                                // src="https://placeimg.com/295/295/any/tech?t=190129384"
                                alt={name}
                                className="course__box-right-img"
                                onLoad={onImageLoaded}
                                onError={onImageError}
                            />
                            {
                                !isImgShow && (
                                    <CircleSpinner />
                                )
                            }
                        </Link>
                    </div>
                    <div className="course__box-left">
                        <div className="course__box-left-top">
                            <Link
                                to={`/course-info/${shortName}`}
                                className="course__box-left-link"
                            >
                                {name}
                            </Link>
                        </div>
                        <div className="course__box-left-center">
                            <div className="course__box-left-teacher">
                                <i className="course__box-left-icon fa fa-chalkboard-teacher"></i>
                                <span className="course__box-left-name">
                                    {creator}
                                </span>
                            </div>
                            <div className="course__box-left-stars">
                                <span className="course__box-left-star">
                                    <img src="/images/svgs/star_fill.svg" />
                                </span>
                                <span className="course__box-left-star">
                                    <img src="/images/svgs/star_fill.svg" />
                                </span>
                                <span className="course__box-left-star">
                                    <img src="/images/svgs/star_fill.svg" />
                                </span>
                                <span className="course__box-left-star">
                                    <img src="/images/svgs/star_fill.svg" />
                                </span>
                                <span className="course__box-left-star">
                                    <img src="/images/svgs/star_fill.svg" />
                                </span>
                            </div>
                        </div>
                        <div className="course__box-left-bottom">
                            <div className="course__box-left-des">
                                <p>{description}</p>
                            </div>
                        </div>
                        <div className="course__box-footer">
                            <div className="course__box-footer-right">
                                <i className="course__box-footer-icon fa fa-users"></i>
                                <span className="course__box-footer-count">
                                    202
                                </span>
                            </div>
                            <span className="course__box-footer-left">
                                {price === 0 ? 'رایگان' : price.toLocaleString()}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
