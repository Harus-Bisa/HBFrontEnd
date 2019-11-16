import React from "react";
import {connect} from "react-redux";
import { withAuth } from "../withAuth";


class Settings extends React.Component{
    render(){
        return(
            <div>
                <h1>Settings</h1>
            </div>
        )
    }
}

function mapStateToProps(state){
    console.log(state)
    return{}
}
export default connect(mapStateToProps)(withAuth(Settings));