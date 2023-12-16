import { useRoutes } from "react-router-dom";
import routes from "./routes/routes";
import Footer from "./Components/Footer/Footer";
import Topbar from "./Components/Topbar/Topbar";
import Navbar from "./Components/Navbar/Navbar";
import AuthContext from "./Context/AuthContext";
import { useCallback, useEffect, useState } from "react";

function App() {
  // HOOKs
  const Router = useRoutes(routes)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [token, setToken] = useState(null)
  const [userInfos, setUserInfos] = useState([])
  const [userRole,setUserRole] = useState(null)

  // functions
  const login = (userToken, userInfos) => {
    // console.log(userInfos);
    setToken(userToken)
    setUserInfos(userInfos)
    setIsLoggedIn(true)
    localStorage.setItem('user', JSON.stringify({ userToken }))
  }



  const logout = useCallback(() => {
    setToken(null)
    setUserInfos([])
    setIsLoggedIn(false)
    setUserRole(null)
    localStorage.removeItem('user')
  }, [])



  // useEffect HOOks
  // get Me
  useEffect(() => {
    // console.log('use effect run ');
    const localStorageData = JSON.parse(localStorage.getItem('user'))
    // console.log(localStorageData);
    if (localStorageData) {
      fetch('http://localhost:8080/v1/auth/me', {
        method: 'GET',
        headers: {
          "Authorization": `Bearer ${localStorageData.userToken}`
        }
      }).then(res => {
        if (res.ok) {
          return res.json()
        } else {
          return res.text().then((text) => {
            throw new Error(text)
          })
        }
      }).then(userData => {
        // console.log(userData);
        setIsLoggedIn(true)
        setToken(localStorageData.userToken)
        setUserInfos(userData)
        setUserRole(userData.role)
      }).catch(error => {
        console.log(error.message)
      })

    }


  },[token])


return (
  <AuthContext.Provider value={{
    isLoggedIn,
    token,
    userInfos,
    login,
    logout,
    userRole,
  }}>

    {/* <Topbar /> */}
    {/* <Navbar /> */}
    {Router}
    {/* <Footer /> */}
  </AuthContext.Provider>
);
}

export default App;
