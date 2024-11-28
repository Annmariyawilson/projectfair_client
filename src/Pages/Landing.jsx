import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import ProjectCard from '../Components/ProjectCard'
import { Link } from 'react-router-dom'
import { allProjectsApi } from '../services/allApi'

function Landing() {
    const [projects, setProjects] = useState([])

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        const res = await allProjectsApi()
        console.log(res);
        if (res.status === 200) {
            setProjects(res.data)
        }
    }

    return (
        <>
            <section>
                <div className='w-100 bg-info d-flex justify-content-center align-items-center' style={{ height: '80vh' }}>
                    <Row className='p-4'>
                        <Col className='d-flex justify-content-center flex-column'>
                            <h1 className='text-primary'>Project Fair</h1>
                            <p className='text-primary' style={{ textDecoration: 'bold' }}>
                                Project Hub is a Project Management System (PMS), a comprehensive platform meticulously crafted to simplify and enhance your project and task management endeavors.
                            </p>
                            <div className='d-grid'>
                                <Link to={'/auth'} className='btn btn-primary'>Start to Explore</Link>
                            </div>
                        </Col>
                        <Col>
                            <img className='img-fluid rounded' src="https://www.reachfirst.com/wp-content/uploads/2018/08/Web-Development.jpg" alt="Landing" />
                        </Col>
                    </Row>
                </div>

                <div className='container-fluid'>
                    <h1 className='text-center mb-5'>Sample Projects</h1>

                    <div className='d-flex justify-content-around mb-4'>
                        {projects.length > 0 ? (
                            projects.slice(0, 3).map((item, index) => (
                                <ProjectCard key={index} project={item} />
                            ))
                        ) : (
                            <h4 className='text-center text-danger'>No projects!!</h4>
                        )}
                    </div>

                    <div className='text-center mt-4'>
                        <Link to={'/projects'}>View more</Link>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Landing
