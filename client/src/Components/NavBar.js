import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import {useHistory} from 'react-router-dom'

function NavBar() {

  let history = useHistory();

  const logout = () => {
    document.cookie = "auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "user_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
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
