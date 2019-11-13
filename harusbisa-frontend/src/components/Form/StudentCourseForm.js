import React from "react";

function StudentCourseForm(props){
    var [joinCode, setJoinCode] = React.useState("")
    return(
        <div className="container-fluid">
            <div className="row">
                <div className="content col-md-6" style={{background:"linear-gradient(41.38deg, #9C27D5 5.56%, #6311AB 112.78%)", display:'flex'}}>
                    <h1 style={{color:"white", margin:'auto'}}>Tambah Kelas</h1>
                </div>
                <div className="content col-md-6">
                    <p>Temukan kelas Anda untuk semester ini melalui kode bergabung yang dibagikan oleh dosen Anda.</p>
                    <form>
                        <label>Kode bergabung</label>
                        <input type='text' value={joinCode} onChange={(event) => {setJoinCode(joinCode = event.target.value)}}/>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default StudentCourseForm;