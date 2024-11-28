import React from 'react'
import Container from 'react-bootstrap/Container';
import { useNavigate } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import { toast } from 'react-toastify';

function Header() {
const nav=useNavigate()

const handlelogout=()=>{
  sessionStorage.clear()
  toast.info("user logged out")
  nav('/')
} 

  return (
    <>
     <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">
          <i className="fa-solid fa-diagram-project" />
          {' '}
            Project Hub
          </Navbar.Brand>
          <button className='btn btn-danger' onClick={handlelogout}>Logout</button>
        </Container>
      </Navbar>
    </>
  )
}

export default Header