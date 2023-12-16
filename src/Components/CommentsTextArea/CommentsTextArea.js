import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AuthContext from "../../Context/AuthContext";
import useForm from "../../HOOKS/useForm";
import Input from "../Form/Input";
import { requiredValidator } from '../../Validator/rules'
import swal from "sweetalert";
import "./CommentsTextArea.css";




export default function CommentsTextArea({ comments }) {
  const { courseName } = useParams()
  const authContext = useContext(AuthContext)
  const [userCommentScore, setUserCommentScore] = useState("5")
  // console.log(authContext);

  const [formState, onInputHandeler] = useForm({
    comment: { value: '', isValid: false },
  }, false)

  // console.log(formState);

  const sendComment = (event) => {
    event.preventDefault()

    let newComment = {
      body: formState.inputs.comment.value.trim(),
      courseShortName: courseName,
      score: userCommentScore
    }

    // console.log(newComment);

    // console.log('send comment');
    fetch('http://localhost:8080/v1/comments', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authContext.token}`
      },
      body: JSON.stringify(newComment)
    }).then(res => {
      console.log(res);
      if (res.ok) {
        return res.json()
      } else {
        return res.text().then(text => {
          throw new Error(text)
        })
      }
    }).then(data => {
      console.log(data)
      swal({
        title: 'کامنت با موفقعیت ثبت شد',
        icon: 'success',
        button: 'تایید'
      })
    })
      .catch(error => {
        console.log(error)
        swal({
          title: 'کامنت با موفقعیت ثبت نشد',
          icon: 'error',
          button: 'تلاش دوباره'
        })
      })

  }

  return (
    <div className="comments">
      <div className="comments__header">
        <div className="comments__header-icon-content">
          <i className="comments__header-icon far fa-comment"></i>
        </div>
        <span className="comments__header-title">نظرات</span>
      </div>
      <div className="comments__content">
        {comments && comments.length ? (
          <>
            {comments && comments.map((comment) => (
              <div className="comments__item" key={comment._id}>
                <div className="comments__question">
                  <div className="comments__question-header">
                    <div className="comments__question-header-right">
                      <span className="comments__question-name comment-name">
                        {comment.creator.name}
                      </span>
                      <span className="comments__question-status comment-status">
                        {comment.creator.role === "ADMIN" ? "مدیر" : "کاربر"}
                      </span>
                      <span className="comments__question-date comment-date">
                        {comment.createdAt.slice(0, 10)}
                      </span>
                    </div>
                    <div className="comments__question-header-left">
                      <a
                        className="comments__question-header-link comment-link"
                        href="#"
                      >
                        پاسخ
                      </a>
                    </div>
                  </div>
                  <div className="comments__question-text">
                    <p className="comments__question-paragraph comment-paragraph">
                      {comment.body}
                    </p>
                  </div>
                  {comment.answerContent && (
                    <div className="comments__item">
                      <div className="comments__question">
                        <div className="comments__question-header">
                          <div className="comments__question-header-right">
                            <span className="comments__question-name comment-name">
                              {comment.answerContent.creator.name}
                            </span>
                            <span className="comments__question-status comment-status">
                              {comment.answerContent.creator.role === "ADMIN"
                                ? "مدیر"
                                : "کاربر"}
                            </span>
                            <span className="comments__question-date comment-date">
                              {comment.answerContent.createdAt.slice(0, 10)}
                            </span>
                          </div>
                          <div className="comments__question-header-left">
                            <a
                              className="comments__question-header-link comment-link"
                              href="#"
                            >
                              پاسخ
                            </a>
                          </div>
                        </div>
                        <div className="comments__question-text">
                          <p className="comments__question-paragraph comment-paragraph">
                            {comment.answerContent.body}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </>
        ) : (
          <>
            <div className="alert alert-warning my-5">
              هنوز کامنتی برای این دوره ثبت نشده
            </div>


            {/* <div className="comments__pagantion">
              <ul className="comments__pagantion-list">
                <li className="comments__pagantion-item">
                  <a href="#" className="comments__pagantion-link">
                    <i className="fas fa-long-arrow-alt-right comments__pagantion-icon"></i>
                  </a>
                </li>
                <li className="comments__pagantion-item">
                  <a href="#" className="comments__pagantion-link">
                    1
                  </a>
                </li>
                <li className="comments__pagantion-item">
                  <a href="#" className="comments__pagantion-link">
                    2
                  </a>
                </li>
                <li className="comments__pagantion-item">
                  <a
                    href="#"
                    className="comments__pagantion-link comments__pagantion-link--active"
                  >
                    3
                  </a>
                </li>
              </ul>
            </div> */}
          </>
        )}
      </div >
      {authContext.isLoggedIn ? (
        <>
          <div className="comments__rules">
            <span className="comments__rules-title">قوانین ثبت دیدگاه</span>
            <span className="comments__rules-item">
              <i className="fas fa-check comments__rules-icon"></i>
              اگر نیاز به پشتیبانی دوره دارید از قسمت پرسش سوال در قسمت نمایش انلاین
              استفاده نمایید و سوالات مربوط به رفع اشکال تایید نخواهند شد
            </span>
            <span className="comments__rules-item">
              <i className="fas fa-check comments__rules-icon"></i>
              دیدگاه های نامرتبط به دوره تایید نخواهد شد.
            </span>
            <span className="comments__rules-item">
              <i className="fas fa-check comments__rules-icon"></i>
              سوالات مرتبط با رفع اشکال در این بخش تایید نخواهد شد.
            </span>
            <span className="comments__rules-item">
              <i className="fas fa-check comments__rules-icon"></i>
              از درج دیدگاه های تکراری پرهیز نمایید.
            </span>
          </div>
          <div className="comments__respond">
            <div className="comments__score">
              <span className="comments__score-title">امتیاز شما</span>

              <div>
                {/* <span className="comments__score-input-text"> */}
                  <select className="comments__score-input comment-select" onChange={event => setUserCommentScore(event.target.value)}>
                    <option value="5">عالی</option>
                    <option value="4">خوبه</option>
                    <option value="3">بدک نیست</option>
                    <option value="2">ضعیف</option>
                    <option value="1">خیلی ضعیف</option>
                  </select>
                  {/* امتیاز خود را انتخاب کنید */}
                {/* </span> */}
                {/* <i className="fas fa-angle-down	 comments__input-icon"></i> */}
              </div>

            </div>
            <div className="comments__respond-content">
              <div className="comments__respond-title">دیدگاه شما *</div>
              <Input
                id='comment'
                placeholder='کامنت جدید را وارد کنید'
                className="comments__score-input-respond"
                validations={[
                  requiredValidator(),
                ]}
                onInputHandeler={onInputHandeler}
              />
            </div>
            <button
              type="submit"
              className="comments__respond-btn"
              onClick={sendComment}
              disabled={!formState.isFormValid}
            >
              ارسال
            </button>
          </div>
        </>
      ) : (
        <div className="alert alert-danger my-5">
          <Link to='/login'>
            برای ثبت کامنت ابتدا لاگین کنید
          </Link>
        </div>
      )
      }

    </div >
  );
}

