import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import DataTable from "../../../Components/AdminPanel/DataTable/DataTable";
import Input from "../../../Components/Form/Input";
import useForm from "../../../HOOKS/useForm";
import { emailValidator, maxValidator, minValidator, requiredValidator } from "../../../Validator/rules";
import './Users.css'


export default function Users() {
  const [users, setUsers] = useState([])
  const [formState, onInputHandeler] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
      username: {
        value: "",
        isValid: false,
      },
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
      phone: {
        value: "",
        isValid: false,
      },
    },
    false
  );


  useEffect(() => {
    getAllUsers()
  }, [])

  function getAllUsers() {
    let localStorageData = JSON.parse(localStorage.getItem('user'))
    // console.log(localStorageData);
    fetch('http://localhost:8080/v1/users', {
      headers: {
        "content-type": "application/json",
        'Authorization': `Bearer ${localStorageData.userToken}`
      }
    })
      .then(res => res.json())
      .then(data => {
        // console.log(data)
        setUsers(data)
      })
      .catch(error => console.log(error))
  }


  const removeUser = (userID) => {
    // console.log(userID, 'user removed');
    swal({
      title: 'آیا از حذف کاربر اطمیان دارید',
      icon: 'warning',
      buttons: ['نه', 'آره']
    }).then(result => {
      console.log(result);
      if (result) {
        // console.log('user remove')
        let localStorageData = JSON.parse(localStorage.getItem('user'))
        fetch(`http://localhost:8080/v1/users/${userID}`, {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
            'Authorization': `Bearer ${localStorageData.userToken}`
          }
        }).then(res => {
          if (res.ok) {
            swal({
              title: 'کاربر با موفقعیت حذف شد',
              icon: "success",
              buttons: 'ok'
            })
          } else {
            swal({
              title: "کاربر حذف نشد",
              icon: 'warning',
              buttons: 'ok'
            })
          }
        })
      }
    }).then(
      getAllUsers()
    )
  }

  const banUser = (userID) => {
    // console.log(userID);
    swal({
      title: 'آیا از مسدود کردن کاربر مطمعن هستید',
      icon: 'warning',
      buttons: ['نه', 'آزه']
    }).then((result) => {
      console.log(result);
      if (result) {
        let localStorageData = JSON.parse(localStorage.getItem('user'))
        fetch(`http://localhost:8080/v1/users/ban/${userID}`, {
          method: 'PUT',
          headers: {
            "content-type": "application/json",
            'Authorization': `Bearer ${localStorageData.userToken}`
          }
        }).then(res => {
          // return res.json()
          if (res.ok) {
            swal({
              title: 'کاربر با موفقعیت مسدود شد',
              icon: 'success',
              buttons: 'حله'
            })
          }
        })
      }
    })
  }


  const registerNewUser = (event) => {
    event.preventDefault();
    const newUserInfo = {
      name: formState.inputs.name.value.trim(),
      username: formState.inputs.username.value.trim(),
      email: formState.inputs.email.value.trim(),
      phone: formState.inputs.phone.value.trim(),
      password: formState.inputs.password.value.trim(),
      confirmPassword: formState.inputs.password.value.trim(),
    };
    console.log(newUserInfo);

    fetch('http://localhost:8080/v1/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUserInfo)
    }).then(res => {
      console.log(res);
      if (res.ok) {
        return res.json()
      } else {
        return res.text().then(error => { throw new Error(error) })
      }
    }).then(result => {
      console.log(result);
      swal({
        title: 'کاربر با موفقعیت اضافه شد',
        icon: 'success',
        buttons: 'حله'
      })
      getAllUsers()
    }).catch(error => {
      if (error.message === 'Failed to fetch') {
        console.log("error Failed to fetch or url bug");
        return
      }
      let serverError = JSON.parse(error.message)
      if (serverError.message === 'this phone number banned!') {
        console.log(serverError);
        swal({
          title: "این شماره تماس مسدود شده است",
          icon: "error",
          buttons: 'ای بابا'
        })
      } else {
        console.log(serverError);
        swal({
          title: 'ثبت نام موفقیت آمیز نبود',
          icon: "error",
          button: 'تلاش دوباره'
        })
      }
    })


  };


  return (
    <>
      <div className="container">
        <div className="home-content-edit">
          <div className="back-btn">
            <i className="fas fa-arrow-right"></i>
          </div>
          <form className="form">
            <div className="col-6">
              <div className="name input">
                <label className="input-title">نام و نام خانوادگی</label>
                <Input
                  type="text"
                  className=""
                  id="name"
                  element="input"
                  validations={[
                    requiredValidator(),
                    minValidator(8),
                    maxValidator(20),
                  ]}
                  onInputHandeler={onInputHandeler}
                  placeholder="لطفا نام و نام خانوادگی کاربر را وارد کنید..."
                />
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-6">
              <div className="family input">
                <label className="input-title">نام کاربری</label>
                <Input
                  type="text"
                  className=""
                  id="username"
                  element="input"
                  validations={[
                    requiredValidator(),
                    minValidator(8),
                    maxValidator(20),
                  ]}
                  onInputHandeler={onInputHandeler}
                  placeholder="لطفا نام کاربری را وارد کنید..."
                />
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-6">
              <div className="email input">
                <label className="input-title">ایمیل</label>
                <Input
                  type="text"
                  className=""
                  id="email"
                  element="input"
                  validations={[
                    requiredValidator(),
                    minValidator(8),
                    maxValidator(20),
                    emailValidator(),
                  ]}
                  onInputHandeler={onInputHandeler}
                  placeholder="لطفا ایمیل کاربر را وارد کنید..."
                />
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-6">
              <div className="password input">
                <label className="input-title">رمز عبور</label>
                <Input
                  type="text"
                  className=""
                  id="password"
                  element="input"
                  validations={[
                    requiredValidator(),
                    minValidator(8),
                    maxValidator(20),
                  ]}
                  onInputHandeler={onInputHandeler}
                  placeholder="لطفا رمز عبور کاربر را وارد کنید..."
                />
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-6">
              <div className="phone input">
                <label className="input-title">شماره تلفن</label>
                <Input
                  type="text"
                  className=""
                  id="phone"
                  element="input"
                  validations={[
                    requiredValidator(),
                    minValidator(8),
                    maxValidator(20),
                  ]}
                  onInputHandeler={onInputHandeler}
                  placeholder="لطفا شماره تلفن کاربر را وارد کنید..."
                />
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-12">
              <div className="bottom-form">
                <div className="submit-btn">
                  <input type="submit" value="افزودن" onClick={registerNewUser} />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      {users.length ? (
        <DataTable title="کاربران">
          <table className="table">
            <thead>
              <tr>
                <th>شناسه</th>
                {/* <th>نام</th> */}
                <th>نام و نام خوانوادگی</th>
                <th>نام کاربری</th>
                <th>ایمیل</th>
                <th>شماره تماس</th>
                <th>نقش</th>
                <th>ویرایش</th>
                <th>حذف</th>
                <th>بن</th>
              </tr>
            </thead>
            <tbody>
              <>
                {users.map((user, index) => (
                  <tr key={user._id}>
                    {/* {console.log(user)} */}
                    <td>{index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{user.role}</td>
                    <td>
                      <button type="button" className="btn btn-primary edit-btn">
                        ویرایش
                      </button>
                    </td>
                    <td>
                      <button type="button" className="btn btn-danger delete-btn" onClick={() => removeUser(user._id)}>
                        حذف
                      </button>
                    </td>
                    <td>
                      <button type="button" className="btn btn-warning delete-btn" onClick={() => banUser(user._id)}>
                        بن
                      </button>
                    </td>
                  </tr>
                ))}
              </>
            </tbody>
          </table>
        </DataTable>
      ) : (
        <div className="alert alert-warning my-5 text-center fs-1"> هیچ کاربری یافت نشد </div>
      )}
    </>
  );
}
