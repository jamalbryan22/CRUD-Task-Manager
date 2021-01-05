import axios from 'axios';
import React,{useState} from 'react'

function LoginForm() {
  const [Username, setUsername] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [Age, setAge] = useState('');
  const [LoggingIn, setLoggingIn] = useState(true)

  const signingUp = (e) => {
    setLoggingIn(false);
    e.preventDefault();
  }

  const loggingIn = (e) => {
    setLoggingIn(true);
    e.preventDefault();
  }

  const formSubmit = (e) => {
    
    e.preventDefault();
    let formData = {};
    
    if(LoggingIn) {
      formData = {
        email:Email,
        password:Password
      } 

    axios.post('https://bryan-task-manager.herokuapp.com/users/login', formData)
    .then((res) => console.log(res))
    .catch(e => console.log(e));
    
  } else {

      formData = {
        name:Username,
        email:Email,
        password:Password,
        age:Age
      }

      axios.post('https://bryan-task-manager.herokuapp.com/users', formData)
      .then((res) => console.log(res))
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
      <input value={Email} onChange={(e)=>{setEmail(e.target.value)}} autoComplete="on"/>
      </div>
      <div className="form-group">
      <label>Password</label>
      <input type="password" value={Password} onChange={(e)=>{setPassword(e.target.value)}} autoComplete="on"/>
      </div>
      <button type="submit" className="formSubmitButton">Submit</button>
     </form>
      </>
    )
  }else{
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
      <button type="submit" className="formSubmitButton">Submit</button>
     </form>
      </>
    )
  }

}

export default LoginForm
