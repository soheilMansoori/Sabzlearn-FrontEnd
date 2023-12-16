import React, { useContext, useState } from "react";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";
import Topbar from "../../Components/Topbar/Topbar";
import Input from "../../Components/Form/Input";
import Button from "../../Components/Form/Button";
import useForm from "../../HOOKS/useForm";
import AuthContext from "../../Context/AuthContext";
import { Link, useNavigate } from 'react-router-dom'
import { requiredValidator, maxValidator, minValidator, emailValidator, } from '../../Validator/rules'
import ReCAPTCHA from "react-google-recaptcha";
import swal from 'sweetalert'
import "./Login.css";



export default function Login() {
  const navigate = useNavigate()
  const authContext = useContext(AuthContext)
  const [isGoogleRecaptchaVerify, setIsGoogleRecaptchaVerify] = useState(false)
  const [formState, onInputHandeler] = useForm({
    username: { value: '', isValid: false },
    password: { value: '', isValid: false },
  }, false)
  // console.log(formState);

  const userLogin = (event) => {
    event.preventDefault()
    let userData = {
      identifier: formState.inputs.username.value.trim(),
      password: formState.inputs.password.value.trim(),
    }

    // console.log(userData);

    fetch('http://localhost:8080/v1/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
      .then(res => {
        // console.log(res);
        if (res.ok) {
          return res.json()
        } else {
          return res.text().then((text) => {
            throw new Error(text)
          })
        }
      })
      .then(data => {
        // console.log(data);
        authContext.login(data.accessToken, {}) // setContext
        navigate('/')
      })
      .catch(error => {
        // console.log(error.message);
        if (error.message == 'Failed to fetch') {
          console.log('error Failed to fetch or url bug');
          return
        }
        
        let serverErrorMessage = JSON.parse(error.message)
        console.log(serverErrorMessage);

        if(serverErrorMessage === 'there is no user with this email or username'){
          swal({
            title: serverErrorMessage,
            icon: "error",
            button: 'تلاش دوباره'
          })
          return
        }


        if(serverErrorMessage.message){
          swal({
            title: serverErrorMessage.message,
            icon: "error",
            button: 'تلاش دوباره'
          })

        }


      })


    // console.log('form submit');
  }

  const onChangeHandler = () => {
    console.log('گوگل ری‌کپچا وریفای شد`');
    setIsGoogleRecaptchaVerify(true)
  }


  return (
    <>
      <Topbar />
      <Navbar />

      <section className="login-register">
        <div className="login">
          <span className="login__title">ورود به حساب کاربری</span>
          <span className="login__subtitle">
            خوشحالیم دوباره میبینیمت دوست عزیز :)
          </span>
          <div className="login__new-member">
            <span className="login__new-member-text">کاربر جدید هستید؟</span>
            <Link className="login__new-member-link" to="/register">
              ثبت نام
            </Link>
          </div>
          <form action="#" className="login-form">
            <div className="login-form__username">
              <Input
                element="input"
                type='text'
                id='username'
                placeholder='نام کاربری یا آدرس ایمیل'
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
            <div className="login-form__password">
              <Input
                element='input'
                id='password'
                type='password'
                placeholder="رمز عبور"
                className="login-form__password-input"
                validations={[
                  requiredValidator(),
                  minValidator(5),
                  maxValidator(12),
                ]}
                onInputHandeler={onInputHandeler}
              />
              <i className="login-form__password-icon fa fa-lock-open"></i>
            </div>
            <div className="login-form__password">
              <ReCAPTCHA sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" onChange={onChangeHandler} />
            </div>
            <Button type="submit"
              className={`login-form__btn ${(formState.isFormValid && isGoogleRecaptchaVerify) ? 'login-form__btn-success' : 'login-form__btn-error'
                }`}
              onClick={userLogin}
              disabled={!formState.isFormValid || !isGoogleRecaptchaVerify}
            >
              <i className="login-form__btn-icon fas fa-sign-out-alt"></i>
              <span className="login-form__btn-text">ورود</span>
            </Button>
            <div className="login-form__password-setting">
              <label className="login-form__password-remember">
                <input className="login-form__password-checkbox" type="checkbox" />
                <span className="login-form__password-text">
                  مرا به خاطر داشته باش
                </span>
              </label>
              <label className="login-form__password-forget">
                <a className="login-form__password-forget-link" href="#">
                  رمز عبور را فراموش کرده اید؟
                </a>
              </label>
            </div>
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
