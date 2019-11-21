import React from "react";

export default function LectureButtonContent(props){
    const Icon = props.icon
    return(
        <div>
            <div className="row">
                <div className="col-4" style={{display:'flex'}}>
                    {Icon && <Icon className="student-icon" style={{margin:'auto'}}/>}
                </div>
                <div className="col-8" style={{display:'flex'}}>
                    <p style={{margin:'auto'}}>{props.content}</p>
                </div>
            </div>
        </div>
    )
}