import React, { memo, useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import "./Topbar.css";

export default memo(function Topbar() {
  // HOOKs
  const [allTopbarLinks, setAllTopbarLinks] = useState([])
  useEffect(() => {
    fetch('http://localhost:8080/v1/menus/topbar')
      .then(res => {
        if (res.ok) {
          return res.json()
        } else {
          return res.text().then((text) => {
            throw new Error(text)
          })
        }
      })
      .then(data => {
        setAllTopbarLinks(data)
      })
      .catch(error => console.log(error.message))
  }, [])

  const getRandomItemsFromArray = (array, randomCount) => {
    const shuffled = [...array].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, randomCount)
  }

  // console.log(getRandomItemsFromArray(allTopbarLinks,5))


  return (
    <div className="top-bar">
      <div className="container-fluid">
        <div className="top-bar__content">
          <div className="top-bar__right">
            <ul className="top-bar__menu">
              {allTopbarLinks && getRandomItemsFromArray(allTopbarLinks, 5).map(topbarLink => (
                <li className="top-bar__item" key={topbarLink._id}>
                  {/* {console.log(topbarLink)} */}
                  <Link to={topbarLink.href} className="top-bar__link">
                    {topbarLink.title}
                  </Link>
                </li>

              ))}
              <li className="top-bar__item">
                <a href="#" className="top-bar__link">
                  20,000 تومان
                </a>
              </li>
            </ul>
          </div>
          <div className="top-bar__left">
            <div className="top-bar__email">
              <a href="#" className="top-bar__email-text top-bar__link">
                sabzlearn@gmail.com
              </a>
              <i className="fas fa-envelope top-bar__email-icon"></i>
            </div>
            <div className="top-bar__phone">
              <a href="#" className="top-bar__phone-text top-bar__link">
                09921558293
              </a>
              <i className="fas fa-phone top-bar__phone-icon"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

)