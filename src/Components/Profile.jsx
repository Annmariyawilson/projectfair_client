import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { profileUpdateApi } from '../services/allApi'
import base_url from '../services/base_url'


function Profile() {
    const [status, setstaus] = useState(false)
    const [userdata, setUserData] = useState({
        profile: "", username: "", github: "", linkedin: ""
    })
    const nav = useNavigate()
    const [preview, setPreview] = useState("")

    useEffect(() => {
        if (sessionStorage.getItem("username")) {
            setUserData({ ...userdata, username: sessionStorage.getItem('username'), github: sessionStorage.getItem('github'),
                 linkedin: sessionStorage.getItem('linkedin'), profile: sessionStorage.getItem('profile') })
        }
    }, [])

    useEffect(() => {
        if (userdata.profile && userdata.profile.type) {
            setPreview(URL.createObjectURL(userdata.profile))
        } else {
            setPreview("")
        }
    }, [userdata.profile])

    const handleProfileUpadtion = async () => {
        console.log(userdata);
        const { username, github, linkedin, profile } = userdata
        if (!username || !github || !linkedin || !profile) {
            toast.warning("Enter Valid Input")
        } else {
            if (userdata.profile.type) {
                const fd = new FormData()
                fd.append("username", username)
                fd.append("github", github)
                fd.append("linkedin", linkedin)
                fd.append("profile", profile)

                const header = {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Token ${sessionStorage.getItem('token')}`
                }
                const res = await profileUpdateApi(fd, header)
                console.log(res);
                if (res.status == 200) {
                    toast.success("Profile Updated")
                    changestatus()
                    sessionStorage.clear()
                    nav('/auth')
                } else {
                    toast.warning("Profile Updation Failed")
                }

            }
            else {
                const header = {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${sessionStorage.getItem('token')}`
                }
                const res = await profileUpdateApi(userdata, header)
                console.log(res);
                if (res.status == 200) {
                    toast.success("Profile Updated")
                    changestatus()
                    sessionStorage.clear()
                    nav('/auth')
                } else {
                    toast.warning("Profile updation failed")
                }

            }
        }
    }

    const changestatus = () => {
        setstaus(!status)
    }
    return (
        <>
            <div className="container-fluid mt-5 p-3 d-flex justify-content-center align-items-center " >
                {
                    status ?

                        <div className="border shadow border-dark p-3">
                            <h5 className="text-center">Profile</h5>
                            <div>
                                <label>
                                    <input type="file" style={{ display: "none" }} onChange={(e) => setUserData({ ...userdata, profile: e.target.files[0] })} />
                                    <img src={preview ? preview : sessionStorage.getItem('profile') ? `${base_url}/uploads/${sessionStorage.getItem('profile')}` : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0J_Zvt3w2VyOOjPzdAesOLDzrs0FKw3N4Fw&s"}
                                        className='img-fluid' alt="" />
                                </label>
                                <input type="text" defaultValue={userdata.username} onChange={(e) => setUserData({ ...userdata, username: e.target.value })} placeholder='Username' className="form-control mb-3" />
                                <input type="text" defaultValue={userdata.github} onChange={(e) => setUserData({ ...userdata, github: e.target.value })} placeholder='Github URL' className="form-control mb-3" />
                                <input type="text" defaultValue={userdata.linkedin} onChange={(e) => setUserData({ ...userdata, linkedin: e.target.value })} placeholder='Linkedln URL' className="form-control mb-3" />
                                <div className='d-flex justify-content-between'>
                                    <button className='btn btn-success' onClick={handleProfileUpadtion}>Upload</button>
                                    <button className='btn btn-danger' onClick={changestatus}>Cancel</button>
                                </div>
                            </div>
                        </div>

                        :
                        <h5 onClick={changestatus} style={{ textDecoration: "underline", color: "blue", cursor: "pointer" }}>Edit user profile</h5>

                }

            </div>
        </>
    )
}

export default Profile