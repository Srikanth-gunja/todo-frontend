import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Components/Login';
import Register from './Components/Register';
import Todo from './Components/Todo';
import Forgot from './Components/Forgot'
import Resetpassword from './Components/Resetpassword'
import Error from './Components/Error';


export default function App() {
 

  return (
    <>
   
      <BrowserRouter basename={process.env.PUBLIC_URL} >
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path='/forgot' element={<Forgot/>} />
          <Route path='/reset-password/:id/:token' element={<Resetpassword/>} />
           <Route path='/reset/:id/:token' element={<Resetpassword/>} />
          <Route  path="/todo" element={ <Todo />} />
          <Route path='*' element={<Error/>} />
        </Routes>
      </BrowserRouter>
      
    </>
     );
}
