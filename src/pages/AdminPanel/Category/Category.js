import React, { useEffect, useState } from "react";
import DataTable from "../../../Components/AdminPanel/DataTable/DataTable";
import Input from "../../../Components/Form/Input";
import useForm from '../../../HOOKS/useForm'
import swal from "sweetalert";
import {
  maxValidator,
  minValidator,

} from '../../../Validator/rules'


import "./Category.css";

export default function Category() {
  const [allCategories, setAllCategories] = useState([]);
  const [formState, onInputHandeler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      shortname: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    getAllCategories()
  }, []);

  function getAllCategories() {
    fetch(`http://localhost:8080/v1/category`)
      .then(res => res.json())
      .then(allCategories => {
        console.log(allCategories);
        setAllCategories(allCategories);
      }).catch(error => console.log(error.message))
  }


  const createNewCategory = (event) => {
    event.preventDefault();
    const localStorageData = JSON.parse(localStorage.getItem("user"));
    console.log(localStorageData);
    const newCategoryInfo = {
      title: formState.inputs.title.value,
      name: formState.inputs.shortname.value,
    };

    fetch("http://localhost:8080/v1/category", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorageData.userToken}`,
      },
      body: JSON.stringify(newCategoryInfo),
    })
      .then(res => {
        console.log(res);
        if (res.ok) {
          return res.json()
        } else {
          return res.text().then(error => { throw new Error(error) })
        }
      })
      .then(data => {
        console.log(data);
        swal({
          title: "دسته بندی مورد نظر با موفقیت اضافه شد",
          icon: "success",
          buttons: "اوکی",
        }).then(() => {
          getAllCategories();
        });
      }).catch(error => console.log(error.message))
  };

  const removeCategory = (categoryID) => {
    const localStorageData = JSON.parse(localStorage.getItem("user"));
    swal({
      title: "آیا از حذف دسته بندی اطمینان داری؟",
      icon: "warning",
      buttons: ["نه", "آره"],
    }).then((result) => {
      if (result) {
        fetch(`http://localhost:8080/v1/category/${categoryID}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorageData.userToken}`,
          },
        })
          .then(res => {
            console.log(res);
            if (res.ok) {
              return res.json()
            } else {
              return res.text().then(error => { throw new Error(error) })
            }
          })
          .then(data => {
            swal({
              title: "دسته بندی مورد نظر با موفقیت حذف شد",
              icon: "success",
              buttons: "اوکی",
            }).then(() => {
              getAllCategories();
            });
          }).catch(error => console.log(error.message))
      }
    });
  };

  const updateCategory = (categoryID) => {
    const localStorageData = JSON.parse(localStorage.getItem("user"));
    swal({
      title: "عنوان جدید دسته بندی را وارد نمایید",
      content: "input",
      buttons: "ثبت عنوان جدید",
    }).then(result => {
      if (result && result.trim().length) {
        fetch(`http://localhost:8080/v1/category/${categoryID}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorageData.userToken}`,
          },
          body: JSON.stringify({
            title : result,
            name: 'test'
          })
        })
          .then(res => {
            console.log(res);
            if (res.ok) {
              return res.json()
            } else {
              return res.text().then(error => { throw new Error(error) })
            }
          })
          .then(data => {
            console.log(data);
            swal({
              title: "دسته بندی مورد نظر با موفقیت ویرایش شد",
              icon: "success",
              buttons: "اوکی",
            }).then(() => {
              getAllCategories();
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
            <span>افزودن دسته‌بندی جدید</span>
          </div>
          <form className="form">
            <div className="col-6">
              <div className="name input">
                <label className="input-title">عنوان</label>
                <Input
                  element="input"
                  onInputHandeler={onInputHandeler}
                  type="text"
                  id="title"
                  placeholder="لطفا عنوان را وارد کنید..."
                  validations={[minValidator(5), maxValidator(20)]}
                />
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-6">
              <div className="name input">
                <label className="input-title">اسم کوتاه</label>
                <Input
                  element="input"
                  onInputHandeler={onInputHandeler}
                  type="text"
                  id="shortname"
                  placeholder="لطفا اسم کوتاه را وارد کنید..."
                  validations={[minValidator(5), maxValidator(20)]}
                />
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-12">
              <div className="bottom-form">
                <div className="submit-btn">
                  <input
                    type="submit"
                    value="افزودن"
                    onClick={createNewCategory}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      {allCategories.length ? (
        <DataTable title="دسته‌بندی‌ها">
          <table className="table">
            <thead>
              <tr>
                <th>شناسه</th>
                <th>عنوان</th>
                <th>ویرایش</th>
                <th>حذف</th>
              </tr>
            </thead>
            <tbody>
              {allCategories.length && allCategories.map((category, index) => (
                <tr key={category._id}>
                  <td>{index + 1}</td>
                  <td>{category.title}</td>
                  <td>
                    <button type="button" className="btn btn-primary edit-btn" onClick={() => updateCategory(category._id)}>
                      ویرایش
                    </button>
                  </td>
                  <td>
                    <button type="button" className="btn btn-danger delete-btn" onClick={() => removeCategory(category._id)}>
                      حذف
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </DataTable>
      ) : (
        <div className="alert alert-warning my-5 text-center fs-1"> هیچ دسته بندی یافت نشد </div>
      )}

    </>
  );
}