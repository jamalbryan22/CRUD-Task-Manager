import React,{useState} from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import {UserContext } from './contextComponents/UserContext'


function LoginForm() {
  const [Username, setUsername] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [Age, setAge] = useState('');
  const [LoggingIn, setLoggingIn] = useState(true);
  const [UserData, setUserData] = useState({});
  const user = useContext(UserContext);


  let history = useHistory();

  const signingUp = (e) => {
    setLoggingIn(false);
  }

  const loggingIn = (e) => {
    setLoggingIn(true);
  }

  let formSubmit = async (e) => {
    
    e.preventDefault();
    let formData = {};
    
    if(LoggingIn) {
      formData = {
        email:Email,
        password:Password
      } 

    axios.post(`${user.port}/users/login`, formData, { withCredentials: true })
    .then((res) => {
       (setUserData(res.data.user));
      history.push("/dashboard", {Username, UserData});
    }).catch(e => alert("There was an error logging in, please verify your credentials"));
    
     
    } else {

      if(Password.length < 8){
        alert("Please choose a password that is at least 8 characters")
        return
      }

    formData = {
      name:Username,
      password:Password,
      email:Email,
      age:Age
    }

    axios.post(`${user.port}/users`, formData, { withCredentials: true })
    .then((res) => {      
      (setUserData(res.data.user))
      console.log(res.data);    
      history.push("/dashboard", {Username, UserData});
    })
    .catch(e => console.log(e));
    }
  }

  if(LoggingIn){
    return (
      <>
      <form onSubmit={formSubmit} className="form">
       <div className="form-selector-button">
        <button type="button" className="LoginStateButton" onClick={(e)=>signingUp(e)}>Sign Up</button>
        <button type="button" className="LoginStateButton" onClick={(e)=>loggingIn(e)}>Log In</button>
      </div>
      <div className="form-group">
        <label>Email</label>
        <input type="email" value={Email} onChange={(e)=>{setEmail(e.target.value)}} autoComplete="on"/>
      </div>
      <div className="form-group">
        <label>Password</label>
        <input type="password" value={Password} onChange={(e)=>{setPassword(e.target.value)}} autoComplete="on"/>
      </div>
      <button className="formSubmitButton">Submit</button>
     </form>
      </>
    )
  } else {
    return (
      <>
      <form onSubmit={formSubmit} className="form">
       <div className="form-selector-button">
        <button type="button" className="LoginStateButton" onClick={(e)=>signingUp(e)}>Sign Up</button>
        <button type="button" className="LoginStateButton" onClick={(e)=>loggingIn(e)}>Log In</button>
      </div>
      <div className="form-group">
        <label>Username</label>
        <input value={Username} onChange={(e)=>{setUsername(e.target.value)}} autoComplete="on"/>
      </div>
      <div className="form-group">
        <label>Password</label>
        <input type="password" value={Password} onChange={(e)=>{setPassword(e.target.value)}} autoComplete="on"/>
      </div>
      <div className="form-group">
        <label>Email</label>
        <input value={Email} onChange={(e)=>{setEmail(e.target.value)}} autoComplete="on"/>
      </div>
      <div className="form-group">
        <label>Age</label>
        <input value={Age} onChange={(e)=>{setAge(e.target.value)}} autoComplete="on"/>
      </div>
      <button className="formSubmitButton">Submit</button>
     </form>
      </>
    )
  }
}
export default LoginForm
