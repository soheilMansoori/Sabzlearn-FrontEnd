import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import swal from 'sweetalert'
import Footer from '../../Components/Footer/Footer'
import Button from '../../Components/Form/Button'
import Input from '../../Components/Form/Input'
import Navbar from '../../Components/Navbar/Navbar'
import Topbar from '../../Components/Topbar/Topbar'
import useForm from '../../HOOKS/useForm'
import { emailValidator, maxValidator, minValidator, requiredValidator } from '../../Validator/rules'
import './Contact.css'
export default function Contact() {
    const navigate = useNavigate()
    const [formState, onInputHandeler] = useForm(
        {
            name: {
                value: "",
                isValid: false,
            },
            email: {
                value: "",
                isValid: false,
            },
            phone: {
                value: "",
                isValid: false,
            },
            body: {
                value: "",
                isValid: false,
            },
        },
        false
    );
    // console.log(formState);


    const addNewContact = (event) => {
        event.preventDefault()


        let addNewContact = {
            name: formState.inputs.name.value.trim(),
            email: formState.inputs.email.value.trim(),
            phone: formState.inputs.phone.value.trim(),
            body: formState.inputs.body.value.trim(),
        }
        // console.log(addNewContact);


        fetch('http://localhost:8080/v1/contact', {
            method: 'POST',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(addNewContact)
        }).then(res => {
            if (res.ok) {
                return res.json()
            }
            return res.text().then(text => { throw new Error(text) })

        }).then(data => {
            console.log(data)
            swal({
                title: 'پیغام شما با موفقیعت به مدیران سایت ارسال شد',
                icon: 'success',
                buttons: 'ok'
            }).then(() => {
                navigate('/')
            })
        })
            .catch(error => {
                if (error.message === 'Failed to fetch') {
                    console.log('Failed to fetch url or oders bug');
                    return
                }
                // console.log(error.message);
                // console.log(typeof (error.message))
                let serverError = JSON.parse(error.message).message
                console.log(serverError)
            })
    };
    return (
        <>
            <Topbar />
            <Navbar />

            <section className="login-register">
                <div className="login register-form">
                    <span className="login__title">ارتباط با ما</span>
                    <span className="login__subtitle">
                        نظر یا انتقادتو بنویس برامون :)
                    </span>
                    <form action="#" className="login-form">
                        <div className="login-form__username login-form__parent">
                            <Input
                                element="input"
                                type='text'
                                id='name'
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
                        <div className="login-form__password login-form__parent">
                            <Input
                                onInputHandeler={onInputHandeler}
                                element="input"
                                id="email"
                                className="login-form__password-input"
                                type="text"
                                placeholder="آدرس ایمیل"
                                validations={[requiredValidator(), minValidator(8), maxValidator(40), emailValidator()]}
                            />
                            <i className="login-form__password-icon fa fa-envelope"></i>
                        </div>
                        <div className="login-form__phone-number login-form__parent">
                            <Input
                                onInputHandeler={onInputHandeler}
                                element="input"
                                id="phone"
                                className="login-form__password-input"
                                type="text"
                                placeholder="شماره تماس"
                                validations={[requiredValidator(), minValidator(10), maxValidator(11)]}
                            />
                            <i className="login-form__password-icon fa fa-phone"></i>
                        </div>
                        <div className="login-form__text login-form__parent">
                            <Input
                                onInputHandeler={onInputHandeler}
                                element="textarea"
                                id="body"
                                className="login-form__text-input"
                                placeholder="متن خود را وارد کنید"
                                validations={[requiredValidator()]}
                            />
                        </div>
                        <Button
                            className={`login-form__btn ${formState.isFormValid
                                ? "login-form__btn-success"
                                : "login-form__btn-error"
                                }`}
                            type="submit"
                            onClick={addNewContact}
                            disabled={!formState.isFormValid}
                        >
                            <span className="login-form__btn-text">ارسال</span>
                        </Button>
                    </form>
                </div>
            </section>

            <Footer />
        </>
    );
}

