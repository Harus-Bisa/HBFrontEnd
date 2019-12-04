import React from "react";
import { Button } from "@material-ui/core";

function QuizTypeForm(props){
    const style={display:'flex', flexDirection:'column', textAlign:'start', marginTop:"15px", marginBottom:'15px'}
    return(
        <div className="container">
            <div className="row">
                <div className="col-5 content">
                    <div>
                        <Button fullWidth>
                            <div style={style}>
                                <h5>Pilihan Ganda</h5>
                                <p>Tanggal ini akan menjadi nama sesi anda</p>
                            </div>
                        </Button>
                        <Button fullWidth>
                            <div style={style}>
                                <h5>Isian</h5>
                                <p>Tanggal ini akan menjadi nama sesi anda</p>
                            </div>
                        </Button>
                        <Button fullWidth>
                            <div style={style}>
                                <h5>Angka</h5>
                                <p>Tanggal ini akan menjadi nama sesi anda</p>
                            </div>
                        </Button>
                    </div>
                </div>
                <div className="col-7" style={{background:"#EFF1F5"}}>

                </div>
            </div>
        </div>
    )
}

export default QuizTypeForm;