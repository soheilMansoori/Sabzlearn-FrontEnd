import React, { useEffect, useState } from "react";
import DataTable from "../../../Components/AdminPanel/DataTable/DataTable";
import swal from "sweetalert";
import Input from "../../../Components/Form/Input";
import useForm from "../../../HOOKS/useForm";
import { minValidator } from "../../../Validator/rules";
import Editor from "../../../Components/Form/Editor";
import { Link } from 'react-router-dom'

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [articleCategory, setArticleCategory] = useState(null);
  const [articleCover, setArticleCover] = useState({});
  const [articleBody, setArticleBody] = useState("");

  const [formState, onInputHandeler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      shortName: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    false
  );




  useEffect(() => {
    getAllArticles();

    fetch(`http://localhost:8080/v1/category`)
      .then((res) => res.json())
      .then((allCategories) => {
        setCategories(allCategories);
      }).catch(error => console.log(error.message))
  }, []);

  function getAllArticles() {
    fetch("http://localhost:8080/v1/articles")
      .then((res) => res.json())
      .then((allArticles) => {
        // console.log(allArticles);
        setArticles(allArticles);
      }).catch(error => console.log(error.message))
  }

  const removeArticle = (articleID) => {
    const localStorageDate = JSON.parse(localStorage.getItem("user"));
    swal({
      title: "آیا از حذف مقاله اطمینان دارید؟`",
      icon: "warning",
      buttons: ["نه", "آره"],
    }).then((result) => {
      if (result) {
        fetch(`http://localhost:8080/v1/articles/${articleID}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorageDate.userToken}`,
          },
        }).then((res) => {
          if (res.ok) {
            return res.json()
          } else {
            return res.text().then(error => { throw new Error(error) })
          }

        }).then(data => {
          // console.log(data)
          swal({
            title: "مقاله مورد نظر با موفقیت حذف شد",
            icon: "success",
            buttons: "اوکی",
          }).then(() => {
            getAllArticles();
          });
        })
          .catch(error => console.log(error.message))
      }
    });
  };


  const createArticle = event => {
    event.preventDefault()
    const localStorageDate = JSON.parse(localStorage.getItem('user'))
    let formData = new FormData()
    formData.append('title', formState.inputs.title.value)
    formData.append('shortName', formState.inputs.shortName.value)
    formData.append('description', formState.inputs.description.value)
    formData.append('categoryID', articleCategory)
    formData.append('cover', articleCover)
    formData.append('body', articleBody)

    if (articleCategory) {
      fetch(`http://localhost:8080/v1/articles`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorageDate.userToken}`
        },
        body: formData
      }).then(res => {
        console.log(res);
        if (res.ok) {
          return res.json()
        } else {
          return res.text().then(error => { throw new Error(error) })
        }
      }).then(data => {
        swal({
          title: 'مقاله جدید با موفقیت ایجاد شد',
          icon: 'success',
          buttons: 'اوکی'
        }).then(() => {
          getAllArticles()
        })

      }).catch(error => console.log(error.message))
    }

  }


  const saveArticleAsDraft = (event) => {
    event.preventDefault();
    const localStorageDate = JSON.parse(localStorage.getItem("user"));
    let formData = new FormData();
    formData.append("title", formState.inputs.title.value);
    formData.append("shortName", formState.inputs.shortName.value);
    formData.append("description", formState.inputs.description.value);
    formData.append("categoryID", articleCategory);
    formData.append("cover", articleCover);
    formData.append("body", articleBody);

    fetch(`http://localhost:8080/v1/articles/draft`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorageDate.userToken}`,
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
        title: "مقاله جدید با موفقیت پیش نویس شد",
        icon: "success",
        buttons: "اوکی",
      }).then(() => {
        getAllArticles();
      });
    }).catch(error => console.log(error.message))
  };

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
                <Input
                  element="input"
                  type="text"
                  id="title"
                  onInputHandeler={onInputHandeler}
                  validations={[minValidator(8)]}
                />
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-6">
              <div className="name input">
                <label className="input-title" style={{ display: "block" }}>
                  لینک
                </label>
                <Input
                  element="input"
                  type="text"
                  id="shortName"
                  onInputHandeler={onInputHandeler}
                  validations={[minValidator(5)]}
                />
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-12">
              <div className="name input">
                <label className="input-title" style={{ display: "block" }}>
                  چکیده
                </label>
                {/* <textarea style={{ width: "100%", height: "200px" }}></textarea> */}
                <Input
                  element="textarea"
                  type="text"
                  id="description"
                  onInputHandeler={onInputHandeler}
                  validations={[minValidator(5)]}
                  className="article-textarea"
                  style={{
                    width: "100%",
                    height: "170px",
                  }}
                />
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-12">
              <div className="name input">
                <label className="input-title" style={{ display: "block" }}>
                  محتوا
                </label>
                <Editor
                  value={articleBody}
                  setValue={setArticleBody}
                />
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-6">
              <div className="name input">
                <label className="input-title" style={{ display: "block" }}>
                  کاور
                </label>
                <input
                  type="file"
                  onChange={(event) => {
                    setArticleCover(event.target.files[0]);
                  }}
                />
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-6">
              <div className="name input">
                <label className="input-title" style={{ display: "block" }}>
                  دسته بندی
                </label>
                <select
                  onChange={(event) => setArticleCategory(event.target.value)}
                >
                  <option value={articleCategory}>دسته بندی مقاله را انتخاب کنید،</option>
                  {categories.map((category) => (
                    <option value={category._id} key={category._id}>{category.title}</option>
                  ))}
                </select>
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-12">
              <div className="bottom-form">
                <div className="submit-btn">
                  <input
                    type="submit"
                    value="انتشار"
                    onClick={createArticle} />
                  <input
                    type="submit"
                    value="پیش‌نویس"
                    className="m-1"
                    onClick={saveArticleAsDraft}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      {articles.length ? (
        <DataTable title="مقاله‌ها">
          <table className="table">
            <thead>
              <tr>
                <th>شناسه</th>
                <th>عنوان</th>
                <th>لینک</th>
                <th>نویسنده</th>
                <th>وضعیت</th>
                <th>ویرایش</th>
                <th>حذف</th>
              </tr>
            </thead>
            <tbody>
              {articles.length && articles.map((article, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{article.title}</td>
                  <td>{article.shortName}</td>

                  <td>{article.creator.name}</td>
                  <td>{article.publish === 1 ? "منتشر شده" : "پیش‌نویس"}</td>
                  <td>
                    {article.publish === 1 ? (
                      <i className="fa fa-check"></i>
                    ) : (
                      <Link
                        to={`draft/${article.shortName}`}
                        className="btn btn-primary edit-btn"
                      >
                        ادامه نوشتن
                      </Link>
                    )}
                  </td>
                  <td>
                    <button type="button" className="btn btn-primary edit-btn">
                      ویرایش
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-danger delete-btn"
                      onClick={() => removeArticle(article._id)}
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
        <div className="alert alert-warning my-5 text-center fs-1"> هیچ مقاله ایی یافت نشد </div>
      )}

    </>
  );
}
