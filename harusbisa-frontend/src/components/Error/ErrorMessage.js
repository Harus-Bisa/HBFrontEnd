import React from "react";
import {connect} from "react-redux";

function ErrorMessage(props){
    return(
        <div>
            <h5>Error</h5>
            <p>{props.error.message}</p>
        </div>
    )
}

function mapStateToProps(state){
    return {error: state.error}
}

export default connect(mapStateToProps)(ErrorMessage);
