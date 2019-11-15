import React from "react";
import { Alert } from 'reactstrap';
import {connect} from "react-redux";

function ErrorMessage(props){
    return(
        <Alert color="danger">
            {props.error.message}
        </Alert>
    )
}

function mapStateToProps(state){
    return {error: state.error}
}

export default connect(mapStateToProps)(ErrorMessage);
