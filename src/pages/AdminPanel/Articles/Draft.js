import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Editor from "../../../Components/Form/Editor";

export default function Draft() {
    const {shortName} = useParams()
    // console.log(shortName);
    useEffect(() => {
        fetch(`http://localhost:8080/v1/articles/${shortName}`)
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(error => console.log(error))
    } ,[])
  return (
    <>
      <div className="container-fluid" id="home-content">
        <div className="container">
          <div className="home-title">
            <span>افزودن مقاله جدید</span>
          </div>
          <form className="form">
            <div className="col-6">
              <div className="name input">
                <label className="input-title" style={{ display: "block" }}>
                  عنوان
                </label>
                <input type="text" />
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-6">
              <div className="name input">
                <label className="input-title" style={{ display: "block" }}>
                  لینک
                </label>
                <input type="text" />
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-12">
              <div className="name input">
                <label className="input-title" style={{ display: "block" }}>
                  چکیده
                </label>
                {/* <textarea style={{ width: "100%", height: "200px" }}></textarea> */}

                <input type="text" className="article-textarea" />
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-12">
              <div className="name input">
                <label className="input-title" style={{ display: "block" }}>
                  محتوا
                </label>
                <Editor value="" setValue={() => {}} />
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-6">
              <div className="name input">
                <label className="input-title" style={{ display: "block" }}>
                  کاور
                </label>
                <input type="file" />
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-6">
              <div className="name input">
                <label className="input-title" style={{ display: "block" }}>
                  دسته بندی
                </label>
                <select>
                  <option value="-1">دسته بندی مقاله را انتخاب کنید،</option>
                </select>
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-12">
              <div className="bottom-form">
                <div className="submit-btn">
                  <input type="submit" value="انتشار" className="m-1" />
                  <input type="submit" value="پیش‌نویس" className="m-1" />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
