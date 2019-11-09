import React from "react";

function CourseForm(props){
    const [name, setName] = React.useState();
    const [startDate, setStartDate] = React.useState();
    const [endDate, setEndDate] = React.useState();

    const submit = (event) =>{
        event.preventDefault();
        console.log(name)
    }
    return(
        <div>
            <form onSubmit={submit}>
                <label>Course Name*</label>
                <input type="text" onChange={(event) => setName(event.target.value)}></input>
                <br/>
                <label>Start Date*</label>
                <input type="text" onChange={(event) => setStartDate(event.target.value)}></input>
                <br/>
                <label>End Date*</label>
                <input type="text" onChange={(event) => setEndDate(event.target.value)}></input>
                <br/>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default CourseForm;