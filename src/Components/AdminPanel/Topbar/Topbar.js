import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../../Context/AuthContext";

export default function Topbar() {
  const authContext = useContext(AuthContext)
  const [isShowNotificationsBox, setIsShowNotificationsBox] = useState(false);
  // console.log(authContext);
  const seeNotification = (notificationID) => {
    fetch(`http://localhost:8080/v1/notifications/${notificationID}`, {
      method: 'PUT',
      headers: {
        'Authorization': ` ${authContext.token}`
      }
    }).then(res => res.json())
      .then(data => console.log(data))
      .catch(error => console.log(error))

  }


  return (
    <div className="container-fluid">
      <div className="container">
        <div
          className={`home-header ${isShowNotificationsBox && "active-modal-notfication"
            }`}
        >
          <div className="home-right">
            <div className="home-searchbar">
              <input type="text" className="search-bar" placeholder="جستجو..." />
            </div>
            <div className="home-notification">
              <button
                type="button"
                onMouseEnter={() => setIsShowNotificationsBox(true)}
                onClick={() => setIsShowNotificationsBox(prevSatet => !prevSatet)}
              >
                <i className="far fa-bell"></i>
              </button>
            </div>
            <div
              className="home-notification-modal"
              onMouseEnter={() => setIsShowNotificationsBox(true)}
              onMouseLeave={() => setIsShowNotificationsBox(false)}
            >
              <ul className="home-notification-modal-list">
                {authContext.userInfos.length ? (
                  <>
                    {authContext.userInfos.notifications.map(notification => (
                      <li className="home-notification-modal-item">
                        <span className="home-notification-modal-text">
                          {notification}
                        </span>
                        <label className="switch">
                          <a href="javascript:void(0)" onClick={() => seeNotification(notification._id)}>دیدم</a>
                        </label>
                      </li>
                    ))}

                  </>
                ) : (
                  <li className="home-notification-modal-item"> پیغامی یافت نشد </li>
                )}
              </ul>
            </div>
          </div>
          <div className="home-left">
            <div className="home-profile">
              <div className="home-profile-image">
                <a href="#">
                  <img src={authContext.userInfos.profile} alt="" />
                </a>
              </div>
              <div className="home-profile-name">
                <a href="#">{authContext.userInfos.name}</a>
              </div>
              <div className="home-profile-icon">
                <i className="fas fa-angle-down"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
