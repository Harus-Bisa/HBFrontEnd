import React from "react";
import { Button } from "@material-ui/core";

function Landing(props){
    return(
        <div>
            <header>
                <h1>Selamat datang di harus bisa</h1>
            </header>
            <div>
                <Button onClick={() => props.history.push("/login")}>Login</Button>
                <Button onClick={() => props.history.push("/signup")}>Daftar</Button>
            </div>
        </div>
    )
}

export default Landing;