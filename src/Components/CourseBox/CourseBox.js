import React, { useState } from "react";
import { Link } from "react-router-dom";
import CircleSpinner from "../CircleSpinner/CircleSpinner";
import CourseColumnBox from "./Boxs/CourseColumnBox/CourseColumnBox";
import CourseRowBox from "./Boxs/CourseRowBox/CourseRowBox";

import "./CourseBox.css";

export default function CourseBox({ name, cover, shortName, price, isSlider, creator, description, displayType = 'column' }) {
  // console.log(displayType);
  // console.log(name, cover, shortName, creator, price);
  const [isImgShow, setIsImgShow] = useState(false)

  const onImageLoaded = () => setIsImgShow(true)

  const onImageError = () => {
    // Codes
  }

  return (
    <>
      {displayType === 'row' ? (
        <CourseRowBox
          name={name}
          cover={cover}
          shortName={shortName}
          creator={creator}
          price={price}
          description={description}
          isSlider={isSlider}
          isImgShow={isImgShow}
          onImageLoaded={onImageLoaded}
          onImageError={onImageError}

        />
      ) : (
        <CourseColumnBox
          name={name}
          cover={cover}
          shortName={shortName}
          creator={creator}
          price={price}
          isSlider={isSlider}
          isImgShow={isImgShow}
          onImageLoaded={onImageLoaded}
          onImageError={onImageError}
        />
      )}
    </>
  );
}
