import React, { useState } from "react";
import {connect} from "react-redux";
import {login} from "../../redux/actions";
import ErrorMessage from "../../components/Error/ErrorMessage";

function Login(props){
    var [email, setEmail] = useState("");
    var [password, setPassword] = useState("");

    var handleSubmit = async (event) => {
        event.preventDefault()
        props.login(email, password)       
    }
    React.useEffect(()=>{
        if (props.loggedIn){
            if(props.role === "student"){
                props.history.push("/student/courses")
            }
            else if(props.role === "faculty"){
                props.history.push("/faculty/courses")
            }
        }
    })
    return(
        <div>
            {props.error && <ErrorMessage/>}
            <form onSubmit={handleSubmit}>
                <label>Email*</label>    
                <input type="text" onChange={(event) => setEmail(email = event.target.value)}/>
                <label>Password*</label>
                <input type="password" onChange={(event) => setPassword(password = event.target.value)}/>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

function mapStateToProps(state){
    return{
        role: state.role,
        error: state.error,
        loggedIn: state.loggedIn
    }
}
export default connect(mapStateToProps, {login})(Login);
