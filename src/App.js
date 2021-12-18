
import './App.css';
import React, { useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

const  App =()=> {
  const pageSize = 5;
  const apiKey = process.env.REACT_APP_NEWS_API;
  const [progress, setProgress] = useState(5)
  
  const setProgres = (progress)=>{
    setProgress(progress)
  }
 
    return (
      <div>
        <Router>
        <LoadingBar
        color='#f11946'
        height={3}
        progress={progress}
      />
       <Navbar/>
       <Switch>
          <Route exact path="/"><News setProgress={setProgres} apiKey={apiKey} key="general" pageSize = {pageSize} country = 'in' category = 'general'/></Route>
          <Route exact path="/business"><News setProgress={setProgres} apiKey={apiKey} key="business" pageSize = {pageSize} country = 'in' category = 'business' /></Route>
          <Route exact path="/entertainment"><News setProgress={setProgres} apiKey={apiKey} key="entertainment" pageSize = {pageSize} country = 'in' category = 'entertainment'/></Route>
          <Route exact path="/health"><News setProgress={setProgres} apiKey={apiKey} key="health" pageSize = {pageSize} country = 'in' category = 'health'/></Route>
          <Route exact path="/science"><News pageSize = {pageSize} country = 'in' category = 'science'/></Route>
          <Route exact path="/sports"><News setProgress={setProgres} apiKey={apiKey} key="sports" pageSize = {pageSize} country = 'in' category = 'sports'/></Route>
          <Route exact path="/technology"><News setProgress={setProgres} apiKey={apiKey} key="technology" pageSize = {pageSize} country = 'in' category = 'technology'/></Route>
        </Switch>
       </Router>
      </div>
    )
  
}

export default App;

