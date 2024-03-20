import React,{useState} from 'react';
import './Login.css'
import axios from 'axios';
import {useNavigate,useParams} from 'react-router-dom';
import LoadingPopup from './LoadingPopup'


 const url="https://todo-backend-hbc4.onrender.com/api/user/reset-password/";


const Resetpassword =()=>{
	const {id,token}=useParams();
 const navigate=useNavigate();
	const [password,setPassword]=useState('');
	 const [error, setError] = useState('');
	 const [sent,setSent]=useState(false)

const handleChange=(e)=>{
	setError('')
setPassword(e.target.value);

}	 
const handleClick=async (e)=>{
	e.preventDefault();
	
	try{
		if(password!==''){
		const res=await axios.post(`${url}${id}/${token}`,{password});
		if(res&&res.status===200){
			setSent(true);
			navigate('/');
		}
		else{
			setError("failed to send verfication")
			navigate('/')
		}
	}
	else{
		setError("enter password first")
	}
}

catch(err){
	if(err.response.status){
		setError(err.response.data.msg)
		navigate('/')
	}
}


}


	return(
		
   <div className="login-container">
     
    {sent ? (<LoadingPopup/>) :(<form onSubmit={handleClick} className="login-form">
       <div className="error-message">
        {error && (
          <>
            <span role="img" aria-label="Error">&#128683;</span> <span className="error-text">{error}</span>
          </>
        )}
      </div>
			<h4>Enter new password</h4>
        <input
          type='password'
          placeholder="password"
          name="password"
          value={password}
          onChange={handleChange}
          className="login-input"
        />
 
        <br />
        <button type="submit" className='login-button'>Reset</button>
       
    </form>)}
    </div>);
}
export default Resetpassword;