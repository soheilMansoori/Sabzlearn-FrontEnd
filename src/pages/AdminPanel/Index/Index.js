import React, { useContext, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import DataTable from '../../../Components/AdminPanel/DataTable/DataTable'
import PAdminItem from '../../../Components/AdminPanel/PAdminItem/PAdminItem'
import AuthContext from '../../../Context/AuthContext'
import './Index.css'


export default function AdminPanelIndex() {
    // console.log(JSON.parse(localStorage.getItem('user')))
    const authContext = useContext(AuthContext)
    const userLogin = JSON.parse(localStorage.getItem('user'))
    const [infos, setInfos] = useState([])
    const [lastRegisteredUsers, setLastRegisteredUsers] = useState([])
    const [adminName, setAdminName] = useState('')

    useEffect(() => {
        fetch("http://localhost:8080/v1/infos/p-admin", {
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).userToken}`,
            },
        })
            .then((res) => res.json())
            .then((pageInfo) => {
                console.log(pageInfo);
                setInfos(pageInfo.infos)
                setLastRegisteredUsers(pageInfo.lastUsers)
                setAdminName(pageInfo.adminName)
            }).catch(error => console.log(error.message))
    }, []);

    return (
        <>
            {authContext.userRole === "USER" || !userLogin ? (
                <>
                    <Navigate to='/' />
                </>
            ) : (
                <>
                    <div className='container'>
                        <div className="home-content-title">
                            <span className="welcome">
                                خوش آمدید,<span className="name">{adminName}</span>
                            </span>
                        </div>
                        <div className="home-content-boxes">
                            <div className="row">
                                {infos.length && infos.map(item => (
                                    <PAdminItem {...item} />
                                ))}
                            </div>
                        </div>
                    </div>
                    
                    <DataTable title="افراد اخیرا ثبت نام شده">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>شناسه</th>
                                    <th>نام و نام خانوادگی</th>
                                    <th>ایمیل</th>
                                </tr>
                            </thead>
                            <tbody>
                                {lastRegisteredUsers.map((user, index) => (
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{user.name}</td>
                                        {/* <td>09123443243</td> */}
                                        <td>{user.email}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </DataTable>
                </>
            )}
        </>
    )
}
