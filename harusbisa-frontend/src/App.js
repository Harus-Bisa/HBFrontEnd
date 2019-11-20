import React from 'react';
import {BrowserRouter as Router} from "react-router-dom"; 
import { getUser, getCourses } from "./redux/actions";
import {connect} from "react-redux";
import Routes from './Routes';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./css/font/ITC_Avant_Garde_Gothic/stylesheet.css";
import "./css/appDefault.css";
import InsideNavbar from './components/Navbar/InsideNavbar';

class App extends React.Component{
  async componentDidUpdate(){
    if (this.props.loggedIn){
      await Promise.all([this.props.getUser(), this.props.getCourses()]);
    }
  }

  async componentDidMount(){
    if (this.props.loggedIn){
      await Promise.all([this.props.getUser(), this.props.getCourses()]);
    }
  }
  render(){
    return(
      <Router>
        {this.props.loggedIn && <InsideNavbar/>}
        <Routes/>
      </Router>
    )
  }
}

function mapStateToProps(state){
  return{
    loggedIn: state.loggedIn
  }
}
export default connect(mapStateToProps, {getCourses, getUser})(App)
