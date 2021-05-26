import {React, useContext, useEffect, useState} from 'react';
import {UserContext} from './contextComponents/UserContext'
import axios from 'axios'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import PlayArrowOutlinedIcon from '@material-ui/icons/PlayArrowOutlined';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import TaskDisplayHeader from './TaskDisplayHeader';
import { FormHelperText } from '@material-ui/core';
import {useMediaQuery} from 'react-responsive';

function TaskDisplay(props) {

  const user = useContext(UserContext);
  const [task, setTask] = useState({});

  useEffect(() => {
    axios.get('http://localhost:3008/tasks', { withCredentials: true })
    .then(res => {
      user.setTaskStore(res.data)
    })
    .catch(error => console.log(`from get request: ${error}`))
  },[])
  
  let taskStoreCopy = user.taskStore;

  useEffect(() => {
    console.log(user.taskStore)
  }, [user.taskStore])

  const containerStyle = {
    width:"80%"
  }

  const taskItemStyle = {
    display: "flex",
    alignItems:"flex-start",
    marginTop:".5rem"
  }

  const mobileTaskItemStyle = {
    display:"flex",
    alignItems:"flex-start",
    marginTop:".5rem"
  }

  const isSmallerScreen = useMediaQuery({
    query: '(max-width: 1195px)'
  })

  const taskItemDescription = {
    width:"80%",
    color: "White"
  }

  const taskItemButton = {
    width:"10%",
    color:"white"
  }
  
  const avatarStyle = {
    backgroundColor: "none",
    width:"30px",
    height:"30px"
  }


  const toggleTaskCompletion = (task) => {
    task.completed = !task.completed
    for(let data in taskStoreCopy){
      if(task._id === data._id){
        data.completed = task.completed;
      }
    }
     axios.patch(`http://localhost:3008/tasks/${task._id}`,{"completed":task.completed}, {withCredentials:true})
     .then(setTask);
  }

  const deleteTask = (taskId)=>{
    user.setTaskStore(user.taskStore.filter(task => task._id !== taskId)) 
    axios.delete(`http://localhost:3008/tasks/${taskId}`, {withCredentials:true})
  }

  console.log(taskStoreCopy);

  const tasks = taskStoreCopy.map(task=>
    <div className="taskItem" style={isSmallerScreen ? mobileTaskItemStyle : taskItemStyle}>
      <ChevronRightIcon/>
      <p style={taskItemDescription}>{task.description}</p>

        {task.completed ?
          <CheckBoxIcon onClick={()=>toggleTaskCompletion(task)} style={taskItemButton}
          /> 
          :
          <CheckBoxOutlineBlankIcon onClick={()=>toggleTaskCompletion(task)} style={taskItemButton}
          /> 
        }
        <DeleteIcon onClick={()=>deleteTask(task._id)} style={taskItemButton} />
    </div>  
  )


  return (
    <div style={containerStyle} >   
      <TaskDisplayHeader/>
      {tasks}
    </div>
    )
  }

export default TaskDisplay