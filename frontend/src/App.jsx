import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login/login';
import SignUp from './pages/signup/signup';
import Home from './pages/home/home';
import { Toaster } from 'react-hot-toast';
import { useAuthContext } from './context/AuthContext';

import './App.css';

function App() {

const {authUser} = useAuthContext();


  return (
    <Router>
      <div className='p-4 h-screen flex items-center justify-center'>
        <Routes>
        <Route path='/' element={authUser ? <Home /> : <Navigate to={"/login"} />} />
          <Route path="/signup" element= { authUser? <Navigate to={"/"} />  :  <SignUp />} />
          <Route path="/login" element=     { authUser? <Navigate to={"/"} />  :  <Login />} />
        </Routes>
        <Toaster/>
      </div>
    </Router>
  );
}

export default App;
