import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import axios from 'axios'
  import {useHistory} from 'react-router-dom'

function NavBar() {

  let history = useHistory();


  const logout = () => {
  //   axios.post('http://localhost:3008/users/logout', {withCredentials:true})
  //   .then(() => {
  //    history.push("/");
  //   })
  //  .catch(e => console.log(e));

    history.push("/");

  }

  const navBarItemStyle = {
    display:"flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom:"4rem"
  }

  return (
    <div style={{width:"80%"}}>
      <AppBar position="static" style={navBarItemStyle}>
        <Button color="inherit" onClick={logout}>Logout</Button>
      </AppBar>
    </div>
  )
}

export default NavBar
