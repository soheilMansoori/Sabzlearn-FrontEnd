import React, { useContext, useState } from "react";
import { Link, NavLink, useLocation, useNavigate, useParams } from 'react-router-dom'
import AuthContext from "../../../Context/AuthContext";
import LogoutModal from "../../Modals/LogoutModal/LogoutModal";

import './Sidebar.css'

export default function Sidebar() {
  const authContext = useContext(AuthContext)
  const navigate = useNavigate()
  const location = useLocation()
  // console.log(location);
  // console.log(authContext);
  const [isShowLogoutModal, setIsShowLogoutModal] = useState(false)
  const canselLogout = () => setIsShowLogoutModal(false)

  const acpectLogout = () => {
    console.log('کاربر از حساب خود خارج شد');
    authContext.logout()
    setIsShowLogoutModal(false)
    navigate('/')
  }

  return (
    <>
      <div id="sidebar" className="col-2">
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <Link to="/">
              <img src="/images/logo/Logo.png" alt="Logo" />
            </Link>
          </div>

          <div className="sidebar-menu-btn">
            <i className="fas fa-bars"></i>
          </div>
        </div>
        <div className="sidebar-menu">
          <ul>
            {/* className="active-menu" */}
            <Link to="/p-admin" className={location.pathname === '/p-admin' && "active-menu"}>
              <span>صفحه اصلی</span>
            </Link>

            <NavLink to="courses" className={(page) => page.isActive && "active-menu"}>
              <span>دوره ها</span>
            </NavLink>

            <NavLink to="menus" className={(page) => page.isActive && "active-menu"}>
              <span>منو ها</span>
            </NavLink>

            <NavLink to="articles" className={(page) => page.isActive && "active-menu"}>
              <span>مقاله ها</span>
            </NavLink>

            <NavLink to="users" className={(page) => page.isActive && "active-menu"}>
              <span>کاربران</span>
            </NavLink>

            <NavLink to="comments" className={(page) => page.isActive && "active-menu"}>
              <span>کامنت ها</span>
            </NavLink>

            <NavLink to="offs" className={(page) => page.isActive && "active-menu"}>
              <span>کد تخفیف ها</span>
            </NavLink>

            <NavLink to="sessions" className={(page) => page.isActive && "active-menu"}>
              <span>جلسات</span>
            </NavLink>


            <NavLink to="category" className={(page) => page.isActive && "active-menu"}>
              <span>دسته‌بندی‌ها</span>
            </NavLink>

            <NavLink to="contact" className={(page) => page.isActive && "active-menu"}>
              <span>تماس با ما</span>
            </NavLink>

            <Link to="/my-account">
              <span>پنل کلربری</span>
            </Link>


            <li>
              <a onClick={() => setIsShowLogoutModal(true)}>
                <span>خروج</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* modal */}
      <LogoutModal
        title='آیا از حساب خود میخواهید خارج شوید ؟'
        isShowLogoutModal={isShowLogoutModal}
        acpectLogout={acpectLogout}
        canselLogout={canselLogout}
      />

    </>
  );
}
