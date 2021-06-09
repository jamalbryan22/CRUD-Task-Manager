import {React, useState, useContext} from 'react';
import axios from 'axios';
import {TextField, Button, Typography,} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import {UserContext } from './contextComponents/UserContext'


function NewTaskCard() {
  const [completed, setCompleted] = useState(false);
  const [description, setDescription] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogTitleText, setDialogTitleText] = useState('')
  const [dialogContentText, setDialogContentText] = useState('')
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const user = useContext(UserContext);
  
  const formSubmit = async (e) => {

    e.preventDefault();

    let task = {
      description,
      completed
    }

    axios.post("/tasks", task, { withCredentials: true })
    .then((res) => {      
      setDialogTitleText("Congratulations, your task was successfully created");
      setDialogContentText("The secret of getting ahead is getting started. ~ Mark Twain"); 
      user.setTaskStore(user.taskStore.concat(res.data));    
      handleDialogOpen();
    })
    .catch(error => {
      if(error.response.status === 401){
        alert("Your session has timed out. Please logout to back to the home screen to sign back in and authenticate.")
      }
      console.log(error)
      setDialogTitleText("Oh no, your task was unsuccessfully created");
      setDialogContentText("Check the browser console for further errors"); 
      handleDialogOpen();
      }
    );
  }

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  return (
   <>
    <form onSubmit={formSubmit} className="form">
      <Typography variant="h4"> Create a new task</Typography>
      <TextField
        id="task-description-input"
        label="Description"
        type="text"
        autoComplete="current-password"
        fullWidth={true}
        margin="normal"
        onChange={(e)=>setDescription(e.target.value)}
      />
      <TextField
          id="standard-select-currency-native"
          select
          label="Completed?"
          value={completed}
          onChange={(e)=>setCompleted(e.target.value)}
          SelectProps={{
            native: true,
          }}
          fullWidth={true}
          margin="normal"
          helperText="Please indicate if task is completed"
        >
          <option value={false}>Uncomplete</option>
          <option value={true}>Complete</option>
      </TextField>
      <Button 
        type="submit"
        fullWidth={true}
      >
        Submit
      </Button>
    </form>

    {/* response dialog */}
    <Dialog
        fullScreen={fullScreen}
        open={openDialog}
        onClose={handleDialogClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {dialogTitleText}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {dialogContentText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleDialogClose} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>      
    <br/>
   </>
  )
}

export default NewTaskCard
