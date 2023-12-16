import { createContext } from "react";

const AuthContext = createContext({
    isLoggedIn: false,
    token: null,
    userInfos: null,
    login: () => { },
    logout: () => { },
    userRole : null ,
})

export default AuthContext