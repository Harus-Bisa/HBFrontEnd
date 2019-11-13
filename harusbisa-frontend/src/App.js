import React from 'react';
import {BrowserRouter as Router} from "react-router-dom"; 
import {Provider} from "react-redux";
import store from "./redux/store/index";
import Routes from './Routes';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./css/font/ITC_Avant_Garde_Gothic/stylesheet.css";
import "./css/appDefault.css";

export default function App(){
  return(
    <Provider store={store}>
        <Router>
            <Routes/>
        </Router>
    </Provider>
  )
}
