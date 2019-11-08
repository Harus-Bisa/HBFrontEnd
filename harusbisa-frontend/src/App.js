import React from 'react';
import { Route, Switch, withRouter} from "react-router-dom";
import Login from "./pages/Login/Login";
import Courses from './pages/Courses/Courses';
import './App.css';
import ProfDashboard from './pages/Dashboard/ProfDashboard';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
      <Switch>
        <Route exact path="/" component={Login}/>
        <Route exact path="/courses" component={Courses}/>
        <Route exact path="/dashboard/:id" component={ProfDashboard}/>
      </Switch>
  );
}

export default withRouter(App);
