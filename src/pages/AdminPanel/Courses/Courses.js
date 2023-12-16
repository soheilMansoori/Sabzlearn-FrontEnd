import React, { useEffect, useState } from "react";
import DataTable from "../../../Components/AdminPanel/DataTable/DataTable";
import swal from "sweetalert";
import useForm from "./../../../HOOKS/useForm";
import Input from "./../../../Components/Form/Input";
import {
  requiredValidator,
  minValidator,
  maxValidator,
} from "../../../Validator/rules";

import "./Courses.css";
export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [courseCategory, setCourseCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [courseStatus, setCourseStatus] = useState("start");
  const [courseCover, setCourseCover] = useState({});
  const [formState, onInputHandeler] = useForm({
    name: {
      value: "",
      isValid: false,
    },
    description: {
      value: "",
      isValid: false,
    },
    shortName: {
      value: "",
      isValid: false,
    },
    price: {
      value: "",
      isValid: false,
    },
    support: {
      value: "",
      isValid: false,
    },
  },
    false
  );

  useEffect(() => {
    getAllCourses();

    fetch(`http://localhost:8080/v1/category`)
      .then(res => res.json())
      .then(allCategories => {
        setCategories(allCategories);
      }).catch(error => console.log(error.message))
  }, []);

  function getAllCourses() {
    const localStorageData = JSON.parse(localStorage.getItem("user"));
    fetch("http://localhost:8080/v1/courses", {
      headers: {
        Authorization: `Bearer ${localStorageData.userToken}`,
      },
    })
      .then(res => res.json())
      .then(allCourses => {
        console.log(allCourses);
        setCourses(allCourses);
      }).catch(error => console.log(error.message))
  }

  const removeCourse = (courseID) => {
    const localStorageData = JSON.parse(localStorage.getItem("user"));
    swal({
      title: "آیا از حذف دوره اطمینان داری؟",
      icon: "warning",
      buttons: ["نه", "آره"],
    }).then((result) => {
      if (result) {
        fetch(`http://localhost:8080/v1/courses/${courseID}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorageData.userToken}`,
          },
        }).then((res) => {
          if (res.ok) {
            swal({
              title: "دوره موردنظر با موفقیت حذف شد",
              icon: "success",
              buttons: "اوکی",
            }).then(() => {
              getAllCourses();
            });
          } else {
            swal({
              title: "حذف دوره با مشکلی مواجه شد",
              icon: "error",
              buttons: "اوکی",
            });
          }
        }).catch(error => console.log(error.message))
      }
    });
  };

  const selectCategory = (event) => {
    setCourseCategory(event.target.value);
  };

  const addNewCourse = (event) => {
    event.preventDefault();
    const localStorageData = JSON.parse(localStorage.getItem('user'))
    let formData = new FormData()
    formData.append('name', formState.inputs.name.value)
    formData.append('description', formState.inputs.description.value)
    formData.append('shortName', formState.inputs.shortName.value)
    formData.append('categoryID', courseCategory)
    formData.append('price', formState.inputs.price.value)
    formData.append('support', formState.inputs.support.value)
    formData.append('status', courseStatus)
    formData.append('cover', courseCover)
    if (courseCategory) {
      fetch(`http://localhost:8080/v1/courses`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorageData.userToken}`
        },
        body: formData
      }).then(res => {
        console.log(res);
        if (res.ok) {
          return res.json
        } else {
          return res.text().then(error => { throw new Error(error) })
        }
      }).then(data => {
        swal({
          title: 'دوره جدید با موفقیت اضافه شد',
          icon: 'success',
          buttons: 'اوکی'
        }).then(() => {
          getAllCourses()
        })
      })
        .catch(error => console.log(error.message))

    } else {
      swal ({
        title : 'لطفا دسته بندی مورد نظر را انتخاب کنید',
        icon : 'warning',
        buttons : 'حله'
      })
    }


  };


  return (
    <>
      <div className="container-fluid" id="home-content">
        <div className="container">
          <div className="home-title">
            <span>افزودن دوره جدید</span>
          </div>
          <form className="form">
            <div className="col-6">
              <div className="name input">
                <label className="input-title">نام دوره</label>
                <Input
                  id="name"
                  element="input"
                  onInputHandeler={onInputHandeler}
                  validations={[minValidator(5)]}
                  type="text"
                  placeholder="لطفا نام دوره را وارد کنید..."
                />
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-6">
              <div className="price input">
                <label className="input-title">توضیحات دوره</label>
                <Input
                  id="description"
                  element="input"
                  onInputHandeler={onInputHandeler}
                  validations={[minValidator(5)]}
                  type="text"
                  placeholder="لطفا توضیحات دوره را وارد کنید..."
                />
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-6">
              <div className="number input">
                <label className="input-title">Url دوره</label>
                <Input
                  id="shortName"
                  element="input"
                  onInputHandeler={onInputHandeler}
                  validations={[minValidator(5)]}
                  type="text"
                  isValid="false"
                  placeholder="لطفا Url دوره را وارد کنید..."
                />
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-6">
              <div className="price input">
                <label className="input-title">قیمت دوره</label>
                <Input
                  id="price"
                  element="input"
                  onInputHandeler={onInputHandeler}
                  validations={[minValidator(5)]}
                  type="text"
                  isValid="false"
                  placeholder="لطفا قیمت دوره را وارد کنید..."
                />
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-6">
              <div className="price input">
                <label className="input-title">نحوه پشتیبانی دوره</label>
                <Input
                  id="support"
                  element="input"
                  onInputHandeler={onInputHandeler}
                  validations={[minValidator(5)]}
                  type="text"
                  isValid="false"
                  placeholder="لطفا نحوه پشتیبانی دوره را وارد کنید..."
                />
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-6">
              <div className="number input">
                <label className="input-title">دسته‌بندی دوره</label>
                {categories.length ? (
                  <select onChange={selectCategory}>
                    <option value={courseCategory}>دسته بندی خود را انتخاب کنید</option>
                    {categories.map((category) => (
                      <option value={category._id} key={category._id}>{category.title}</option>
                    ))}
                  </select>
                ) : (null)}
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-6">
              <div className="file">
                <label className="input-title">عکس دوره</label>
                <input
                  type="file"
                  id="file"
                  onChange={(event) => {
                    setCourseCover(event.target.files[0]);
                  }}
                />
              </div>
            </div>
            <div className="col-12">
              <div className="bottom-form">
                <div className="condition">
                  <label className="input-title">وضعیت دوره</label>
                  <div className="radios">
                    <div className="available">
                      <label>
                        <span>در حال برگزاری</span>
                        <input
                          type="radio"
                          value="start"
                          name="condition"
                          checked
                          onInput={(event) =>
                            setCourseStatus(event.target.value)
                          }
                        />
                      </label>
                    </div>
                    <div className="unavailable">
                      <label>
                        <span>پیش فروش</span>
                        <input
                          type="radio"
                          value="presell"
                          name="condition"
                          onInput={(event) =>
                            setCourseStatus(event.target.value)
                          }
                        />
                      </label>
                    </div>
                  </div>
                </div>
                <div className="submit-btn">
                  <input type="submit" value="افزودن" onClick={addNewCourse} />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      {courses.length ? (
        <DataTable title="دوره‌ها">
          <table className="table">
            <thead>
              <tr>
                <th>شناسه</th>
                <th>عنوان</th>
                <th>مبلغ</th>
                <th>وضعیت</th>
                <th>لینک</th>
                <th>مدرس</th>
                <th>دسته بندی</th>
                <th>ویرایش</th>
                <th>حذف</th>
              </tr>
            </thead>
            <tbody>
              {courses.length && courses.map((course, index) => (
                <tr key={course._id}>
                  <td>{index + 1}</td>
                  <td>{course.name}</td>
                  <td>{course.price === 0 ? 'رایگان' : course.price.toLocaleString()}</td>
                  <td>{course.isComplete === 0 ? 'در حال برگزاری' : 'تکمیل شده'}</td>
                  <td>{course.shortName}</td>
                  <td>{course.creator}</td>
                  <td>{course.categoryID && course.categoryID.title}</td>
                  <td>
                    <button type="button" className="btn btn-primary edit-btn">
                      ویرایش
                    </button>
                  </td>
                  <td>
                    <button type="button" className="btn btn-danger delete-btn">
                      حذف
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </DataTable>
      ) : (
        <div className="alert alert-warning my-5 text-center fs-1">هیچ دوره ایی یافت نشد</div>
      )}
    </>
  );
}
