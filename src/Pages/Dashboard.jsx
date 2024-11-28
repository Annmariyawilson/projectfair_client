import React, { useState, useEffect,useContext } from 'react'
import Header from '../Components/Header'
import { Row, Col } from 'react-bootstrap'
import Add from '../Components/Add'
import Edit from '../Components/Edit'
import Profile from '../Components/Profile'
import { getProjectlistApi,deleteProjectApi } from '../services/allApi'
import { addProjectResponseContext , editProjectResponseContext, } from '../Context/Contextapi'
import { toast } from 'react-toastify'

function Dashboard() {
    const [view, setView] = useState(false)
    const [data, setData] = useState([])

    const {addResponse,setAddResponse}=useContext(addProjectResponseContext)
    const {editResponse,setEditResponse}=useContext(editProjectResponseContext)


    useEffect(() => {
        getData()
    }, [addResponse , editResponse])

    const getData = async () => {
        const header = {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Token ${sessionStorage.getItem('token')}`
        }
        const res = await getProjectlistApi(header)
        console.log(res);
        if (res.status == 200) {
            setData(res.data)
        } else {
            console.log(res);

        }
    }

    const handleDelete=async(id)=>{
        const header = {
            'Content-Type': 'application/json',
            'Authorization': `Token ${sessionStorage.getItem('token')}`
        }
        const res=await deleteProjectApi(id,header)
        if(res.status==200){
            toast.success("Project deleted!")
            getData()
        }else{
            toast.warning("Something Went Wrong")
        }
    }

    return (
        <>
            <Header />
            <div className='container-fluid'>
                <h2>User Project</h2>
                <Row>
                    <Col sm={12} md={8}>
                        <div className='w-100 border shadow border-dark p-3 my-3'>
                            <Add />
                            <div className='m-2 px-1 py-5 bg-light border'>

                                {
                                    data.length > 0 ?
                                        <>
                                            {
                                                data.map(item => (
                                                    <div className='border shadow border-2 d-flex justify-content-between p-3'>
                                                        <h4>{item.title}</h4>
                                                        <div>
                                                            <a href={item.github} target='_blank' className='btn'><i className="fa-brands fa-github fa-xl" /></a>
                                                            <Edit project={item} />
                                                            <button className='btn' onClick={()=>handleDelete(item._id)}>
                                                                <i className="fa-solid fa-trash fa-xl" style={{ color: "#c00215", }} />
                                                            </button>
                                                        </div>
                                                    </div>

                                                ))
                                            }
    
                                        </>
                                        :
                                        <h3 className='text-center text-danger'>No projects Added Yet!!!</h3>
                                }


                            </div>
                        </div>
                    </Col>
                    <Col sm={12} md={4}>
                        <Profile />
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default Dashboard