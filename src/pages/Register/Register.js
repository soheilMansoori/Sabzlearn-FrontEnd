import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";
import Topbar from "../../Components/Topbar/Topbar";
import Input from "../../Components/Form/Input";
import Button from "../../Components/Form/Button";
import useForm from '../../HOOKS/useForm'
import { requiredValidator, minValidator, maxValidator, emailValidator } from '../../Validator/rules'
import './Register.css'
import AuthContext from "../../Context/AuthContext";
import swal from "sweetalert";

export default function Register() {
  // HOOKs
  const navigate = useNavigate()
  const authContext = useContext(AuthContext);  // console.log(authContext);
  const [formState, onInputHandeler] = useForm({
    name: {
      value: '',
      isValid: false
    },
    username: {
      value: '',
      isValid: false
    },
    email: {
      value: '',
      isValid: false
    },
    password: {
      value: '',
      isValid: false
    },
    phone: {
      value: '',
      isValid: false
    }
  }, false)
  // console.log(formState);



  // functions
  const registerNewUser = (event) => {
    event.preventDefault()
    // console.log('user register');
    let newUserInfo = {
      name: formState.inputs.name.value.trim(),
      username: formState.inputs.username.value.trim(),
      email: formState.inputs.email.value.trim(),
      password: formState.inputs.password.value.trim(),
      confirmPassword: formState.inputs.password.value.trim(),
      phone: formState.inputs.phone.value.trim(),
    }
    console.log(newUserInfo);


    fetch('http://localhost:8080/v1/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUserInfo)
    }).then(res => {
      // console.log(res);
      if (res.status === 200) {
        return res.json()
      } else {
        return res.text().then((text) => {
          throw new Error(text)
        })
      }
    })
      .then(data => {
        console.log(data)
        authContext.login(data.accessToken, data.user) // setContext
        navigate('/')
      })
      .catch(error => {
        // console.log(error.message);
        if (error.message == 'Failed to fetch') {
          console.log('error Failed to fetch or url bug');
          return
        }
        
        let serverErrorMessage = JSON.parse(error.message)
        // console.log(serverErrorMessage);
        if (serverErrorMessage.message === 'this phone number banned!') {
            swal ({
              title : "این شماره تماس مسدود شده است" ,
              icon : "error" ,
              buttons : 'ای بابا'
            })
        } else {
          swal({
            title: 'ثبت نام موفقیت آمیز نبود',
            icon: "error",
            button: 'تلاش دوباره'
          })
        }

      })
  }

  return (
    <>
      <Topbar />
      <Navbar />

      <section className="login-register">
        <div className="login register-form">
          <span className="login__title">ساخت حساب کاربری</span>
          <span className="login__subtitle">خوشحالیم قراره به جمع ما بپیوندی</span>
          <div className="login__new-member">
            <span className="login__new-member-text">قبلا ثبت‌نام کرده‌اید؟ </span>
            <Link className="login__new-member-link" to="/login">
              وارد شوید
            </Link>
          </div>
          <form action="#" className="login-form">
            <div className="login-form__username">
              <Input
                id='name'
                element="input"
                type="text"
                placeholder="نام و نام خانوادگی"
                className="login-form__username-input"
                validations={[
                  requiredValidator(),
                  minValidator(8),
                  maxValidator(15),
                ]}
                onInputHandeler={onInputHandeler}
              />
              <i className="login-form__username-icon fa fa-user"></i>
            </div>
            <div className="login-form__username">
              <Input
                id='username'
                element="input"
                type="text"
                placeholder="نام کاربری"
                className="login-form__username-input"
                validations={[
                  requiredValidator(),
                  minValidator(8),
                  maxValidator(15),
                ]}
                onInputHandeler={onInputHandeler}
              />
              <i className="login-form__username-icon fa fa-user"></i>
            </div>
            <div className="login-form__username">
              <Input
                id='phone'
                element="input"
                type="text"
                placeholder="شماره تماس"
                className="login-form__username-input"
                validations={[
                  requiredValidator(),
                  minValidator(11),
                  maxValidator(12),
                ]}
                onInputHandeler={onInputHandeler}
              />
              <i className="login-form__username-icon fa fa-user"></i>
            </div>
            <div className="login-form__password">
              <Input
                id='email'
                element='input'
                type="text"
                placeholder="آدرس ایمیل"
                className="login-form__password-input"
                validations={[
                  requiredValidator(),
                  emailValidator()
                ]}
                onInputHandeler={onInputHandeler}
              />
              <i className="login-form__password-icon fa fa-envelope"></i>
            </div>
            <div className="login-form__password">
              <Input
                id='password'
                element="input"
                type="password"
                placeholder="رمز عبور"
                className="login-form__password-input"
                validations={[
                  requiredValidator(),
                  minValidator(8),
                  maxValidator(15),
                ]}
                onInputHandeler={onInputHandeler}
              />
              <i className="login-form__password-icon fa fa-lock-open"></i>
            </div>
            <Button type='submit'
              className={`login-form__btn ${formState.isFormValid ? 'login-form__btn-success' : 'login-form__btn-error'
                }`}
              disabled={!formState.isFormValid}
              onClick={registerNewUser}
            >
              <i className="login-form__btn-icon fa fa-user-plus"></i>
              <span className="login-form__btn-text">عضویت</span>
            </Button>
          </form>
          <div className="login__des">
            <span className="login__des-title">سلام کاربر محترم:</span>
            <ul className="login__des-list">
              <li className="login__des-item">
                لطفا از مرورگر های مطمئن و بروز مانند گوگل کروم و فایرفاکس
                استفاده کنید.
              </li>
              <li className="login__des-item">
                ما هرگز اطلاعات محرمانه شمارا از طریق ایمیل درخواست نمیکنیم.
              </li>
              <li className="login__des-item">
                لطفا کلمه عبور خود را در فواصل زمانی کوتاه تغییر دهید.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
