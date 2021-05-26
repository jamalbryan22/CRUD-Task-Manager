import {React} from 'react'
import NavBar from './NavBar';
import NewTaskCard from './NewTaskCard';
import TaskDisplay from './TaskDisplay';


function Dashboard() {

  return (
    <>
      <div className="container">
        <NavBar/>
        <NewTaskCard/>
        <TaskDisplay/>
      </div>
    </>
  )
}

export default Dashboard
