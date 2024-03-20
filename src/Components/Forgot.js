import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';

const url = "https://todo-backend-hbc4.onrender.com/api/user/forgot";

const Forgot = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    setError('');
    setEmail(e.target.value);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      if (email !== '') {
        const res = await axios.post(url, { email });
        if (res && res.status === 200) {
          setSent(true);
        } else {
          setError("Failed to send verification");
        }
      } else {
        setError("Enter email first");
      }
    } catch (err) {
      if (err.response.status) {
        setError(err.response.data.msg);
      }
    }
  };

  // Function to hide middle characters of email
  const hideMiddleChars = (email) => {
    const atIndex = email.indexOf('@');
    if (atIndex > 0) {
      const firstPart = email.slice(0, 2);
      const lastPart = email.slice(atIndex - 3);
      return `${firstPart}*****${lastPart}`;
    }
    return email;
  };

  return (
    <div className="login-container">
      {sent ? (
        <div className="login-form">
          {/* Big right mark in green color */}
          <div className="confirmation-message">
            <center><span role="img" aria-label="Email sent" style={{ color: 'green', fontSize: '2em' }}>&#10004;</span></center>
            <p>Verification email sent to <strong>{hideMiddleChars(email)}</strong>. Check your inbox!</p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleClick} className="login-form">
          <div className="error-message">
            {error && (
              <>
                <span role="img" aria-label="Error">&#128683;</span> <span className="error-text">{error}</span>
              </>
            )}
          </div>
         
          <h3>Enter email for reset</h3>
          <input
            type='email'
            placeholder="Email"
            name="email"
            value={email}
            onChange={handleChange}
            className="login-input"
          />
          <br />
          <button type="submit" className='login-button'>Send Verification</button>
        </form>
      )}
    </div>
  );
};

export default Forgot;
