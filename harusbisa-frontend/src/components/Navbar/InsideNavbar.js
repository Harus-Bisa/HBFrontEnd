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
                        <p>Dropdown 1</p>
                    </div>
                    <div className="col-4">
                        Logo
                    </div>
                    <div className="col-4">
                        <p>{props.firstName} {props.lastName}</p>
                        <button onClick={props.logout}>Logout</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default connect(mapStateToProps)(InsideNavbar);
