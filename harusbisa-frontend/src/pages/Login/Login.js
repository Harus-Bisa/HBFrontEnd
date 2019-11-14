import React, { useState } from "react";
import services from "../../Services";
// import ErrorMessage from "../../components/Error/Error";

function Login(props){
    var [email, setEmail] = useState("");
    var [password, setPassword] = useState("");
    var [error, setError] = useState(null);

    var handleSubmit = async (event) => {
        event.preventDefault()
        await services.login(email, password)
        .then(response => {
            if (response.role === "faculty" && services.isLoggedIn()){
                props.history.push("/faculty/courses")
            }
            else if (response.role === "student" && services.isLoggedIn()){
                props.history.push("/student/courses")
            }
            else{
                setError(error = {message: "Login error"})
            }
        })
        .catch(e=>{
            setError(error = e);
        })        
    }
    return(
        <div>
            {error && <p>{error.message}</p>}
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

export default Login;
