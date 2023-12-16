import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

import "./SendTicket.css";

export default function SendTicket() {
  const [departments, setDepartments] = useState([]);
  const [departmentsSubs, setDepartmentsSubs] = useState([]);
  const [courses, setCourses] = useState([]);
  const [ticketTypeID, setTicketTypeID] = useState("");
  const [departmentID, setDepartmentID] = useState("");
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("");
  const [body, setBody] = useState("");
  const [courseID, setCourseID] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8080/v1/tickets/departments`)
      .then((res) => res.json())
      .then((data) => setDepartments(data))
      .catch(error => console.log(error.message))

    fetch(`http://localhost:8080/v1/users/courses/`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).userToken
          }`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCourses(data);
      }).catch(error => console.log(error.message))
  }, []);

  const getDepartmentsSub = (departmentID) => {
    fetch(`http://localhost:8080/v1/tickets/departments-subs/${departmentID}`)
      .then((res) => res.json())
      .then((subs) => setDepartmentsSubs(subs))
      .catch(error => console.log(error.message))
  };

  const sendTicket = (event) => {
    event.preventDefault();

    const newTicketInfos = {
      departmentID,
      departmentSubID: ticketTypeID,
      title,
      priority,
      body,
      course: courseID.length ? courseID : undefined,
    };

    fetch(`http://localhost:8080/v1/tickets`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).userToken
          }`,
      },
      body: JSON.stringify(newTicketInfos),
    }).then((res) => {
      if (res.ok) {
        swal({
          title: "تیکت با موفقیت ثبت شد",
          icon: "success",
          buttons: "خیلی هم عالی",
        }).then(() => {
          navigate("/my-account/tickets");
        });
      }
    });
  };

  return (
    <div className="col-9">
      <div className="ticket">
        <div className="ticket-header">
          <span className="ticket-header__title">ارسال تیکت جدید</span>
          <a className="ticket-header__link" href="#">
            همه تیکت ها
          </a>
        </div>
        <form className="ticket-form" action="#">
          <div className="row">
            <div className="col-6">
              <label className="ticket-form__label">دپارتمان را انتخاب کنید:</label>
              <select
                className="ticket-form__select"
                onChange={(event) => {
                  getDepartmentsSub(event.target.value);
                  setDepartmentID(event.target.value);
                }}
              >
                <option className="ticket-form__option">
                  لطفا یک مورد را انتخاب نمایید.
                </option>
                {departments && departments.map((department) => (
                  <option value={department._id}>{department.title}</option>
                ))}
              </select>
            </div>
            <div className="col-6">
              <label className="ticket-form__label">نوع تیکت را انتخاب کنید:</label>
              <select
                className="ticket-form__select"
                onChange={(event) => setTicketTypeID(event.target.value)}
              >
                <option className="ticket-form__option">
                  لطفا یک مورد را انتخاب نمایید.
                </option>
                {departmentsSubs.map((sub) => (
                  <option value={sub._id}>{sub.title}</option>
                ))}
              </select>
            </div>
            <div className="col-6">
              <label className="ticket-form__label">عنوان تیکت را وارد کنید:</label>
              <input
                className="ticket-form__input"
                type="text"
                onChange={(event) => setTitle(event.target.value)}
              />
            </div>
            <div className="col-6">
              <label className="ticket-form__label">
                سطح اولویت تیکت را انتخاب کنید:
              </label>
              <select
                className="ticket-form__select"
                onChange={(event) => setPriority(event.target.value)}
              >
                <option className="ticket-form__option">
                  لطفا یک مورد را انتخاب نمایید.
                </option>
                <option value="3">کم</option>
                <option value="2">متوسط</option>
                <option value="1">بالا</option>
              </select>
            </div>
            {ticketTypeID === "637753247b52cb74cad00e27" && (
              <div className="col-6">
                <label className="ticket-form__label">دوره را انتخاب کنید:</label>
                <select
                  className="ticket-form__select"
                  onChange={(event) => setCourseID(event.target.value)}
                >
                  <option className="ticket-form__option">
                    لطفا یک مورد را انتخاب نمایید.
                  </option>
                  {courses && courses.map((course) => (
                    <option value={course.course._id} key={course._id}>
                      {course.course.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <div className="col-12">
              <label className="ticket-form__label">
                محتوای تیکت را وارد نمایید:
              </label>
              <textarea
                className="ticket-form__textarea"
                onChange={(event) => setBody(event.target.value)}
              ></textarea>
            </div>
            <div className="col-12">
              <div className="ticket-form__file">
                <span className="ticket-form__file-max">
                  حداکثر اندازه: 6 مگابایت
                </span>
                <span className="ticket-form__file-format">
                  فرمت‌های مجاز: jpg, png.jpeg, rar, zip
                </span>
                <input className="ticket-form__file-input" type="file" />
              </div>
            </div>
            <div className="col-12">
              <button className="ticket-form__btn" onClick={sendTicket}>
                <i className="ticket-form__btn-icon fa fa-paper-plane"></i>
                ارسال تیکت
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
