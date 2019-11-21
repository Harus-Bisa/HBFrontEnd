import React from "react";
import { Button } from "@material-ui/core";
import {connect} from "react-redux";

function JoinCourseAnnoucement(props){
    const style={
        text:{
            marginBottom:"1rem"
        }
    }
    return(
        <div className="container-fluid">
            <div className="content">
                <div className="row">
                    <div className="col-12">
                        <h5 style={style.text}>Mintalah siswa Anda membuat akun mereka sendiri</h5>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <p style={style.text}>Salin, kemudia bagikan link ini dengan siswa Anda.</p>
                    </div>
                </div>
                <div className="row" style={{marginBottom:'1rem'}}>
                    <div className="col-9" style={{display:'flex'}}>
                        <div style={{border:'1.5px solid #f4f4f4', padding:'4.5px 8px', margin:'auto 0', width:"100%"}}>
                            <p>{"www.harusbisa.net/join/" + props.joinCode}</p>
                        </div>
                    </div>
                    <div className="col-3" style={{display:'flex'}}>
                        <Button className="prof-button" fullWidth style={{margin:'auto'}}>Salin</Button>
                    </div>
                </div>
                <div className="row" style={{marginBottom:'1rem'}}>
                    <div className="col-12">
                        <p>Atau mintalah siswa Anda mengunjungi www.harusbisa.net/signup dan masukkan kode kelas Anda <strong>{props.joinCode}</strong></p>
                    </div>
                </div>
                <div className="row justify-content-end">
                    <div className="col-3">
                        <Button className="prof-button" fullWidth onClick={props.closePopup}>Selesai</Button>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

function MapStateToProps(state){
    return{
        joinCode:state.courses[state.courses.length-1].join_code
    }
}
export default connect(MapStateToProps)(JoinCourseAnnoucement);