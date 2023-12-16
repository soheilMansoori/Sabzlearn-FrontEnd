import React, { useContext, useEffect, useState } from "react";

import "./Navbar.css";
import AuthContext from "../../Context/AuthContext";
import { Link } from "react-router-dom";

export default function Navbar() {
  // HOOKs
  const authContext = useContext(AuthContext)
  // console.log(authContext);
  const [allMenus, setAllMenus] = useState(null)
  useEffect(() => {
    fetch('http://localhost:8080/v1/menus')
      .then(res => {
        // console.log(res);
        if (res.ok) {
          return res.json()
        }
      })
      .then(menus => {
        // console.log(menus)
        setAllMenus(menus)
      })
      .catch(error => console.log(error))
  }, [])


  return (
    <div className="main-header">
      <div className="container-fluid">
        <div className="main-header__content">
          <div className="main-header__right">
            <Link to='/'>
              <img
                src="/images/logo/Logo.png"
                className="main-header__logo"
                alt="لوگوی سبزلرن"
              />
            </Link>

            <ul className="main-header__menu">
              <li className="main-header__item">
                <Link to='/' className="main-header__link">
                  صفحه اصلی
                </Link>
              </li>
              {allMenus && allMenus.map(menu => (
                <li className="main-header__item" key={menu._id}>
                  <Link to={`${menu.href}/1`} className="main-header__link">
                    {menu.title}
                    {console.log()}
                    {menu.submenus.length !== 0 && (
                      <>
                        <i className="fas fa-angle-down main-header__link-icon"></i>
                        <ul className="main-header__dropdown">
                          {menu.submenus.length && menu.submenus.map(submenu => (
                            <li className="main-header__dropdown-item" key={submenu._id}>
                              <Link to={submenu.href} className="main-header__dropdown-link">
                                {submenu.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </Link>
                </li>
              ))}

            </ul>
          </div>

          <div className="main-header__left">
            <a href="#" className="main-header__search-btn">
              <i className="fas fa-search main-header__search-icon"></i>
            </a>
            <a href="#" className="main-header__cart-btn">
              <i className="fas fa-shopping-cart main-header__cart-icon"></i>
            </a>
            {authContext.isLoggedIn ? (
              <Link to={authContext.userRole && authContext.userRole === 'ADMIN' ? '/p-admin' : '/my-account'} className="main-header__profile">
                <span className="main-header__profile-text">{authContext.userInfos.name}</span>
              </Link>
            ) : (
              <Link to="/login" className="main-header__profile">
                <span className="main-header__profile-text">ورود / ثبت نام</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
