import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import LoadingPopup from './LoadingPopup'; // Import the LoadingPopup component

const url = "https://todo-backend-hbc4.onrender.com/api/user/login";

const Login = () => {

  const [data, setData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setError('');
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      if (data.email !== '' && data.password !== '') {
        setLoading(true);
        const res = await axios.post(url, data);
        if (res.status === 200) {
          toast.success('Login successful');
       
          navigate('/todo', { state: { token: res.data.token } });

        }
      } else {
        setError('Please enter username and password');
      }
    } catch (err) {
      if (err.response) {
        setError('Invalid email or password');
        toast.error(error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      {loading && <LoadingPopup />} {/* Render LoadingPopup component when loading is true */}
      <form onSubmit={handleClick} className="login-form">
        <div className="error-message">
          {error && (
            <>
              <span role="img" aria-label="Error">&#128683;</span> <span className="error-text">{error}</span>
            </>
          )}
        </div>
        <input
          type='email'
          placeholder="Email"
          name="email"
          value={data.email}
          onChange={handleChange}
          className="login-input"
        />
        <br />
        <input
          placeholder="Password"
          name="password"
          type="password"
          value={data.password}
          onChange={handleChange}
          className="login-input"
        />
        <br />
        <button type="submit" className='login-button'>Login</button>
        <Link to="/register" className="signup-link">
          <button className="signup-button">Sign up</button>
        </Link>
        <Link to='/forgot'>
          Forgot password
        </Link>
      </form>
    </div>
  );
};

export default Login;
