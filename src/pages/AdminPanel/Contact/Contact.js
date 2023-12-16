import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import DataTable from "../../../Components/AdminPanel/DataTable/DataTable";

import './Contact.css'

export default function Contact() {
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        getAllContacnts()

    }, []);


    function getAllContacnts() {
        fetch("http://localhost:8080/v1/contact")
            .then((res) => res.json())
            .then((allContacts) => {
                // console.log(allContacts);
                setContacts(allContacts);
            }).catch(error => console.log(error.message))
    }

    const showContactBody = (body) => {
        swal({
            title: body,
            buttons: "اوکی",
        });
    };

    const sendAnwserToUser = (contactEmail) => {
        const localStorageData = JSON.parse(localStorage.getItem('user'))
        swal({
            title: "متن پاسخ را وارد کنید",
            content: 'input',
            buttons: "ارسال ایمیل"
        }).then(value => {
            console.log(value);

            const anwserInfo = {
                email: contactEmail,
                answer: value
            }

            fetch('http://localhost:8080/v1/contact/answer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${localStorageData.userToken}`
                },
                body: JSON.stringify(anwserInfo)
            }).then(res => {
                console.log(res);
                if (res.ok) {
                    return res.json()
                } else {
                    return res.text().then(error => { throw new Error(error) })
                }

            }).then(data => {
                console.log(data)
                swal({
                    title: 'ایمیل برای مخاطب ارسال شد',
                    icon: 'success',
                    buttons: 'حله'
                })
            })
                .catch(error => console.log(error.message))
        })
    };


    const removeContact = (contactID) => {
        const localStorageData = JSON.parse(localStorage.getItem("user"));
        swal({
            title: "آیا از حذف پیغام اطمیمنان دارید",
            icon: "warning",
            buttons: ["نه", "آره"],
        }).then((result) => {
            if (result) {
                fetch(`http://localhost:8080/v1/contact/${contactID}`, {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${localStorageData.userToken}`,
                    },
                }).then((res) => {
                    if (res.ok) {
                        swal({
                            title: "پیغام مورد نظر با موفقیت حذف شد",
                            icon: "success",
                            buttons: "اوکی",
                        }).then(() => {
                            getAllContacnts();
                        });
                    }
                }).catch(error => console.log(error.message))
            }
        });
    };

    return (
        <>
            {contacts.length ? (
                <DataTable title="پیغام‌ها">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>شناسه</th>
                                <th>نام و نام خانوادگی</th>
                                <th>ایمیل</th>
                                <th>شماره تماس</th>
                                <th>مشاهده</th>
                                <th>پاسخ</th>
                                <th>حذف</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contacts && contacts.map((contact, index) => (
                                <tr>
                                    <td
                                        className={contact.answer === 1 ? 'answer-contact' : 'no-answer-contact'}
                                    >{index + 1}</td>
                                    <td>{contact.name}</td>
                                    <td>{contact.email}</td>
                                    <td>{contact.phone}</td>
                                    <td>
                                        <button
                                            type="button"
                                            className="btn btn-primary edit-btn"
                                            onClick={() => showContactBody(contact.body)}
                                        >
                                            مشاهده پیغام
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            type="button"
                                            className="btn btn-primary edit-btn"
                                            onClick={() => sendAnwserToUser(contact.email)}
                                        >
                                            پاسخ
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            type="button"
                                            className="btn btn-danger delete-btn"
                                            onClick={() => removeContact(contact._id)}
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
                <div className="alert alert-warning my-5 text-center fs-1"> هیچ پیغامی یافت نشد </div>
            )}
        </>
    );
}
