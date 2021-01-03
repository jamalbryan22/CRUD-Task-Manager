import './App.css';
import React, { Component } from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import PageNotFound from './PageNotFound'
import Home from './Home'


class App extends Component {
  
  render() {
    return (
      <BrowserRouter>
        <>
        <CssBaseline>
          <Switch>
            <Route exact path="/" render={()=><Home/>}/>
            <Route component={PageNotFound}/>
          </Switch>
        </CssBaseline>
       
        </>
    </BrowserRouter>
    )
  }
}


export default App;
