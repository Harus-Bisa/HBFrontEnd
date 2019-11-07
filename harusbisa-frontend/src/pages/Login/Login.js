import React, { useState } from "react";
import services from "../../Services";

function Login(props){
    var [email, setEmail] = useState("");
    var [password, setPassword] = useState("");
    var [error, setError] = useState(null);

    var handleSubmit = async (event) => {
        event.preventDefault()
        await services.login(email, password)
        if (services.isLoggedIn()){
            props.history.push("/courses")
        }
        else{
            setError(error = {message: "Login error"})
        }
        
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
