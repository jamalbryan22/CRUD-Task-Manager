import './App.css';
import React, { Component } from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import PageNotFound from './PageNotFound'
import Home from './Home'
import Dashboard from './Dashboard';


class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      user:{}
    }
  }

  render() {
    return (
      <BrowserRouter>
        <>
          <Switch>
            <Route exact path="/" render={()=><Home/>}/>
            <Route exact path="/dashboard" render={()=><Dashboard/>}/>
            <Route component={PageNotFound}/>
          </Switch>
        </>
    </BrowserRouter>
    )
  }
}


export default App;
