import Index from '../pages/Index/Index'
import CourseInfo from '../pages/CourseInfo/CourseInfo'
import Category from '../pages/Category/Category'
import ArticleInfo from '../pages/ArticleInfo/ArticleInfo'
import Courses from '../pages/Courses/Courses'
import Login from '../pages/Login/Login'
import Register from '../pages/Register/Register'
import Articles from '../pages/Articles/Articles'
import Contact from '../pages/Contact/Contact'
import Search from '../pages/Search/Search'
import AdminPanel from '../pages/AdminPanel/Index'
import Users from '../pages/AdminPanel/Users/Users'
import AdminCourses from '../pages/AdminPanel/Courses/Courses'
import Menus from '../pages/AdminPanel/Menus/Menus'
import AdminArticles from '../pages/AdminPanel/Articles/Articles'
import AdminPanelIndex from '../pages/AdminPanel/Index/Index'
import AdminCategory from '../pages/AdminPanel/Category/Category'
import AdminContact from '../pages/AdminPanel/Contact/Contact'
import AdminSessions from '../pages/AdminPanel/Sessions/Sessions'
import Session from '../pages/Session/Session'
import AdminComments from '../pages/AdminPanel/Comments/Comments'
import AdminOffs from '../pages/AdminPanel/Offs/Offs'
import Draft from '../pages/AdminPanel/Articles/Draft'


import UserPanel from '../pages/UserPanel/Index'
import UserPanelIndex from '../pages/UserPanel/Index/Index'
import UserPanelOrder from "../pages/UserPanel/Orders/Orders";
import UserPanelCourses from "../pages/UserPanel/Courses/Courses";
import SendTicket from "../pages/UserPanel/Tickets/SendTicket";
import UserPanelTickets from "../pages/UserPanel/Tickets/Tickets";
import UserPanelTicketAnswer from "../pages/UserPanel/Tickets/TicketAnswer";
import UserPanelEditAccount from "../pages/UserPanel/EditAccount/EditAccount";

const routes = [
  { path: '/', element: <Index /> },
  { path: '/course-info/:courseName', element: <CourseInfo /> },
  { path: '/category-info/:categoryName/:pageID', element: <Category /> },
  { path: '/article-info/:articleName', element: <ArticleInfo /> },
  { path: '/courses/:pageID', element: <Courses /> },
  { path: '/articles/:pageID', element: <Articles /> },
  { path: '/search/:searchValue', element: <Search /> },
  { path: "/:courseName/:sessionID", element: <Session /> },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  { path: '/contact', element: <Contact /> },

  {
    path: "/p-admin/*",
    element: <AdminPanel />,
    children: [
      { path: "", element: <AdminPanelIndex /> },
      { path: "users", element: <Users /> },
      { path: "courses", element: <AdminCourses /> },
      { path: "menus", element: <Menus /> },
      { path: "articles", element: <AdminArticles /> },
      { path: "articles/draft/:shortName", element: <Draft /> },
      { path: "category", element: <AdminCategory /> },
      { path: "contact", element: <AdminContact /> },
      { path: "sessions", element: <AdminSessions /> },
      { path: "comments", element: <AdminComments /> },
      { path: "offs", element: <AdminOffs /> },
    ],
  },


  {
    path: "/my-account/*",
    element: <UserPanel />,
    children: [
      { path: "", element: <UserPanelIndex /> },
      { path: "orders", element: <UserPanelOrder /> },
      { path: "buyed", element: <UserPanelCourses /> },
      { path: "tickets", element: <UserPanelTickets /> },
      { path: "send-ticket", element: <SendTicket /> },
      { path: "tickets/answer/:id", element: <UserPanelTicketAnswer /> },
      { path: "edit-account", element: <UserPanelEditAccount /> },
    ],
  },


]

export default routes

