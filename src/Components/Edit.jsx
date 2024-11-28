import React from 'react'
import { useState,useEffect , useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Row, Col } from 'react-bootstrap';
import base_url from '../services/base_url';
import { toast } from 'react-toastify';
import { editProjectApi } from '../services/allApi';
import { editProjectResponseContext } from '../Context/Contextapi';

function Edit({ project }) {
    const [show, setShow] = useState(false);
    const [data, setData] = useState({ ...project })
    const [preview,setPreview]=useState("")
    const {editResponse,setEditResponse}=useContext(editProjectResponseContext)
 
    useEffect(()=>{
        if(data.image.type){
            setPreview(URL.createObjectURL(data.image))
        }else{
            setPreview("")
        }
    },[data.image])
    const handleEdit = async() => {
        console.log(data);
        console.log(data.image.type);
        const { title, description, languages, github, demo, image } = data
        if (!title || !description || !languages || !github || !demo || !image) {
            toast.warning("Invalid Data")
        } else {
            if (data.image.type) {
                const fd = new FormData()
                fd.append('title', title)
                fd.append('des', description)
                fd.append('languages', languages)
                fd.append('github', github)
                fd.append('demo', demo)
                fd.append('image', image)

                const header = {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Token ${sessionStorage.getItem('token')}`
                }
                const res=await editProjectApi(fd,project._id,header)
                console.log(res);
                if(res.status==200){
                    toast.success("Project Updated")
                    handleClose()
                    setEditResponse(res)
                   }else{
                    toast.warning("project updation Failed")
                   }
            }else{
                console.log("No file");
                const header = {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${sessionStorage.getItem('token')}`
                }
               const body={title:title,des:description,languages,github,demo,image}

               const res=await editProjectApi(body,project._id,header)
               console.log(res);
             
               if(res.status==200){
                toast.success("Project Updated")
                handleClose()
                setEditResponse(res)
               }else{
                toast.warning("project updation Failed")
               }
            }
        }

    }
    const handleClose = () =>{
        setData({...project})
        setPreview('')
        setShow(false);
    } 
    const handleShow = () => setShow(true);

    return (
        <>
            <button className='btn' onClick={handleShow}>
                <i className="fa-solid fa-pen-to-square fa-xl" />
            </button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit Project</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <label>
                                <input type="file" onChange={(e) => setData({ ...data, image: e.target.files[0] })} style={{ display: "none" }} />
                                <img src={preview ? preview:`${base_url}/uploads/${project?.image}`}
                                    alt="" className='img-fluid' />
                            </label>
                        </Col>
                        <Col>
                            <div>
                                <input type="text" onChange={(e) => setData({ ...data, title: e.target.value })} defaultValue={project?.title} name={'title'} placeholder='Enter Project Title' className='form-control mb-3' />
                                <input type="text" defaultValue={project?.description} onChange={(e) => setData({ ...data, description: e.target.value })} placeholder='Enter Project Discription' className='form-control mb-3' />
                                <input type="text" defaultValue={project?.languages} onChange={(e) => setData({ ...data, languages: e.target.value })} placeholder='Enter Languages' className='form-control mb-3' />
                                <input type="text" defaultValue={project?.github} onChange={(e) => setData({ ...data, github: e.target.value })} placeholder='Enter GitHub Url' className='form-control mb-3' />
                                <input type="text" defaultValue={project?.demo} onChange={(e) => setData({ ...data, demo: e.target.value })} placeholder='Enter Demo Url' className='form-control mb-3' />
                            </div>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleEdit}>Update</Button>
                </Modal.Footer>
            </Modal>


        </>
    )
}

export default Edit