import React, { useEffect, useState } from "react";
import useForm from "./../../../HOOKS/useForm";
import Input from "./../../../Components/Form/Input";
import DataTable from "../../../Components/AdminPanel/DataTable/DataTable";
import { minValidator } from "../../../Validator/rules";
import swal from "sweetalert";

export default function Sessions() {
    const [courses, setCourses] = useState([]);
    const [sessionCourse, setSessionCourse] = useState(null);
    const [sessionVideo, setSessionVideo] = useState({});
    const [sessions, setSessions] = useState([]);
    const [isSessionFree, setIsSessionFree] = useState(0)



    const [formState, onInputHandeler] = useForm(
        {
            title: {
                value: "",
                isValid: false,
            },
            time: {
                value: "",
                isValid: false,
            },
        },
        false
    );

    useEffect(() => {
        getAllSessions();

        fetch("http://localhost:8080/v1/courses")
            .then((res) => res.json())
            .then((allCourses) => {
                console.log(allCourses);
                setCourses(allCourses);
            }).catch(error => console.log(error.message))
    }, []);

    function getAllSessions() {
        fetch("http://localhost:8080/v1/courses/sessions")
            .then((res) => res.json())
            .then((allSessions) => setSessions(allSessions))
            .catch(error => console.log(error.message))
    }

    const createSession = (event) => {
        event.preventDefault();

        const localStorageData = JSON.parse(localStorage.getItem("user"));

        let formData = new FormData();
        formData.append("title", formState.inputs.title.value);
        formData.append("time", formState.inputs.time.value);
        formData.append("video", sessionVideo);
        formData.append("free", isSessionFree);

        if (sessionCourse) {
            fetch(`http://localhost:8080/v1/courses/${sessionCourse}/sessions`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${localStorageData.userToken}`,
                },
                body: formData,
            }).then((res) => {
                if (res.ok) {
                    return res.json()
                } else {
                    return res.text().then(error => { throw new Error(error) })
                }

            }).then(data => {
                swal({
                    title: "جلسه مورد نظر با موفقیت اضافه شد",
                    icon: "success",
                    buttons: "اوکی",
                }).then(() => {
                    getAllSessions();
                });
            }).catch(error => console.log(error.message))
        }
    }

    const removeSession = (sessionID) => {
        const localStorageData = JSON.parse(localStorage.getItem("user"));

        swal({
            title: "آیا از حذف جلسه اطمینان داری؟",
            icon: "warning",
            buttons: ["نه", "آره"],
        }).then((result) => {
            if (result) {
                fetch(`http://localhost:8080/v1/courses/sessions/${sessionID}`, {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${localStorageData.userToken}`,
                    },
                }).then((res) => {
                    if (res.ok) {
                        return res.json()
                    } else {
                        return res.text().then(error => {throw new Error(error)})
                    }

                }).then(data => {
                    swal({
                        title: "جلسه مورد نظر با موفقیت حذف شد",
                        icon: "success",
                        buttons: "اوکی",
                    }).then((result) => {
                        getAllSessions();
                    });
                }).catch(error => console.log(error.message))
            }
        });
    };

    return (
        <>
      <div className="container-fluid" id="home-content">
        <div className="container">
          <div className="home-title">
            <span>افزودن جلسه جدید</span>
          </div>
          <form className="form">
            <div className="col-6">
              <div className="name input">
                <label className="input-title">عنوان جلسه</label>
                <Input
                  element="input"
                  onInputHandeler={onInputHandeler}
                  type="text"
                  id="title"
                  validations={[minValidator(5)]}
                  placeholder="لطفا نام جلسه را وارد کنید..."
                />
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-6">
              <div className="price input">
                <label className="input-title">مدت زمان جلسه</label>
                <Input
                  element="input"
                  onInputHandeler={onInputHandeler}
                  type="text"
                  id="time"
                  validations={[minValidator(4)]}
                  placeholder="لطفا مدت زمان جلسه را وارد کنید..."
                />
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-6">
              <div className="price input">
                <label className="input-title" style={{ display: "block" }}>
                  دوره
                </label>
                <select
                  className="select"
                  onChange={(event) => setSessionCourse(event.target.value)}
                >
                  <option value="-1">دوره مدنظر را انتخاب کنید</option>
                  {courses.map((course) => (
                    <option value={course._id} key={course._id}>
                      {course.name}
                    </option>
                  ))}
                </select>
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-6">
              <div className="name input">
                <label className="input-title">عنوان جلسه</label>
                <input
                  type="file"
                  onChange={(event) => setSessionVideo(event.target.files[0])}
                />
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-12">
              <div className="bottom-form">
                <div className="condition">
                  <label className="input-title">وضعیت دوره</label>
                  <div className="radios">
                    <div className="available">
                      <label>
                        <span>غیر رایگان</span>
                        <input
                          type="radio"
                          value="0"
                          name="condition"
                          checked
                          onInput={(event) =>
                            setIsSessionFree(event.target.value)
                          }
                        />
                      </label>
                    </div>
                    <div className="unavailable">
                      <label>
                        <span>رایگان</span>
                        <input
                          type="radio"
                          value="1"
                          name="condition"
                          onInput={(event) =>
                            setIsSessionFree(event.target.value)
                          }
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="bottom-form">
                <div className="submit-btn">
                  <input type="submit" value="افزودن" onClick={createSession} />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

            {sessions.length ? (
                <DataTable title="جلسات">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>شناسه</th>
                                <th>عنوان</th>
                                <th>تایم</th>
                                <th>دوره</th>
                                <th>حذف</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sessions.length && sessions.map((session, index) => (
                                <tr key={session._id}>
                                    <td>{index + 1}</td>
                                    <td>{session.title}</td>
                                    <td>{session.time}</td>
                                    <td>{session.course && session.course.name}</td>
                                    <td>
                                        <button
                                            type="button"
                                            className="btn btn-danger delete-btn"
                                            onClick={() => removeSession(session._id)}
                                        >
                                            حذف
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </DataTable>
            ) : (
                <div className="alert alert-warning my-5 text-center fs-1">هیچ جلسه ایی بافت نشد</div>
            )}
        </>
    );
}