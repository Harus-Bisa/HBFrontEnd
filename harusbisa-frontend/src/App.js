import React from 'react';
import { Route, Switch, withRouter} from "react-router-dom";
import Login from "./pages/Login/Login";
import FacultyCourses from './pages/Professor/Courses/Courses';
import StudentCourses from "./pages/Student/Courses/Courses";
import './App.css';
import ProfDashboard from './pages/Professor/Dashboard/Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
      <Switch>
        <Route exact path="/" component={Login}/>
        <Route exact path="/faculty/courses" component={FacultyCourses}/>
        <Route exact path="/faculty/dashboard/:id" component={ProfDashboard}/>

        <Route exact path="/student/courses" component={StudentCourses}/>
      </Switch>
  );
}

export default withRouter(App);
