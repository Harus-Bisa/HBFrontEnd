import React from "react";
import SignUpForm from "../../components/Form/SignUpForm";

function SignUp(props){
    return(
        <div>
            <header>
                <h1>Daftar</h1>
            </header>
            <div className="content">
                <SignUpForm/>
            </div>
        </div>
    )
}

export default SignUp;