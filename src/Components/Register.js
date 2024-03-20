import React, { useState } from 'react';
import { Link ,useNavigate} from 'react-router-dom';
// Import a separate CSS file for styling
import './Register.css'
import axios from 'axios';


const url = "https://todo-backend-hbc4.onrender.com/api/user/register";

const Register = () => {
    const navigate=useNavigate();
 const [error, setError] = useState('');
  const [data, setData] = useState({
    username: '',
    email: '',
    password: ''
  });

  //const history = useHistory();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setError('')
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
      if (data.username !== '' && data.email !== '' && data.password !== '') {
      console.log(data);
      // Redirect to the login page after successful signup
      //history.push('/');
      const res=await axios.post(url,data);
      if(res.status===200)
      {
         setData({
        username: '',
        email: '',
        password: ''
      });
     navigate('/login');
      }
     
    } else {
     setError("enter all details")
    }
 }
    catch(err){
      if(err.response.status){
        setError(err.response.data.msg);
      }
    }
    

  };

  return (
    <div className="register-container">
    <form onSubmit={handleSubmit} className="register-form">
     <div className="error-message">
        {error && (
          <>
            <span role="img" aria-label="Error">&#128683;</span> <span className="error-text">{error}</span>
          </>
        )}
      </div>
      <input
        placeholder='Username'
        value={data.username}
        name='username'
        onChange={handleChange}
      ></input>
      <br />
      <input
        placeholder='Email'
        value={data.email}
        name='email'
        onChange={handleChange}
      ></input>
      <br />
      <input
        placeholder='Password'
        value={data.password}
        name='password'
        type='password'
        onChange={handleChange}
      ></input>
      <br />
      <input type='submit' value='Signup'></input>
      <Link to='/login'>
        <button className='log'>Login</button>
      </Link>
    </form>
  </div>
);
};

export default Register;