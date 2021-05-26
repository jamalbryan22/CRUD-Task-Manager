import React from 'react'
import { useMediaQuery } from 'react-responsive'


function TaskDisplayHeader() {

  const listHeaderStyle = {
    display:"flex",
    color:"white"
  }

  const mobileListHeaderStyle = {
    display:"none",
    // flexDirection:"column",
    // color:"white"
  }

  const isSmallerScreen = useMediaQuery({
    query: '(max-width: 1195px)'
  })

  return (
      <div style={isSmallerScreen? mobileListHeaderStyle:listHeaderStyle} >
        <h4 style={{width:"80%"}}>
          Description
        </h4>
        <h4 style={{width:"10%",textAlign:"center"}}>
          Completed
        </h4>
        <h4 style={{width:"10%",textAlign:"center"}}>
          Delete
        </h4>
      </div>
  )
}

export default TaskDisplayHeader
