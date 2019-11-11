import React from "react";
import {connect} from "react-redux";

function mapStateToProps(state){
    return{
        firstName: state.firstName, 
        lastName: state.lastName
    }
}
function InsideNavbar(props){
    return(
        <div style={{background:'#f4f4f4'}}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-4">
                        Dropdown 1
                    </div>
                    <div className="col-4">
                        Logo
                    </div>
                    <div className="col-4">
                        {props.firstName} {props.lastName}
                        <button onClick={props.logout}>Logout</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default connect(mapStateToProps)(InsideNavbar);
