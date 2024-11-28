import { useState, useContext } from 'react';
import './App.css';
import './bootstrap.min.css';
import Landing from './Pages/Landing';
import AllProject from './Pages/AllProject';
import Auth from './Pages/Auth';
import Dashboard from './Pages/Dashboard';
import Footer from './Components/Footer';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { tokenContext } from './Context/TokenContext'; 

function App() {
  const { tokenStatus, setTokenStatus } = useContext(tokenContext);

  return (
    <>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/dash' element={<Dashboard />} />
        <Route path='projects/' element={<AllProject />} />
        <Route path='/auth' element={<Auth />} />
      </Routes>
      <Footer />
      <ToastContainer />
    </>
  );
}

export default App;
