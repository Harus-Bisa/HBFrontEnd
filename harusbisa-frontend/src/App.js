import React from 'react';
import { Route, Switch, withRouter} from "react-router-dom";
import Login from "./pages/Login/Login";
import Courses from './pages/Courses/Courses';
import './App.css';

function App() {
  return (
      <Switch>
        <Route exact path="/" component={Login}/>
        <Route exact path="/courses" component={Courses}/>
      </Switch>
  );
}

export default withRouter(App);
