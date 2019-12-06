import React from 'react';
import { Route, Switch, withRouter} from "react-router-dom";
import Login from "./pages/Login/Login";
import FacultyCourses from './pages/Professor/Courses/Courses';
import StudentCourses from "./pages/Student/Courses/Courses";
import ProfDashboard from './pages/Professor/Dashboard/Dashboard';
import Settings from "./pages/Settings/Settings";
import Landing from './pages/Landing/Landing';
import SignUp from './pages/SignUp/SignUp';

function Routes() {
  return (
      <Switch>
        <Route exact path="/" component={Landing}/>
        <Route exact path="/signup" component={SignUp}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/faculty/courses" component={FacultyCourses}/>
        <Route exact path="/faculty/dashboard/:id" component={ProfDashboard}/>
        <Route exact path="/student/courses" component={StudentCourses}/>
        <Route exact path="/settings" component={Settings}/>
      </Switch>
  );
}

export default withRouter(Routes);
