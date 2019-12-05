import React from "react";
import {connect} from "react-redux";

function Gradebook(props){
    return(
        <div>
            <header>
                <h1>Daftar Nilai</h1>
            </header>
        </div>
    )
}

export default connect()(Gradebook)