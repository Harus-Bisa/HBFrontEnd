import React from "react";
import { Dialog, DialogContent, Button } from "@material-ui/core";
import CourseForm from "../Form/CourseForm";
import { removeError } from "../../redux/actions";
import {connect} from "react-redux";

function Popup(props){
    const [open, setOpen] = React.useState(false);
    const ContentComponent = props.content
    const Trigger = props.trigger.component
    
    const openPopup = () =>{
        setOpen(true)
        props.removeError()
    }
    return(
        <div>
            <Trigger className={props.trigger.className} onClick={openPopup}>{props.purpose}</Trigger>
            <Dialog open={open} onClose={() => setOpen(false)} style={{padding:0}}>
                <DialogContent> 
                    <ContentComponent closePopup={() => setOpen(false)} id={props.id}/>
                </DialogContent>
            </Dialog>
        </div>
    )   
}

Popup.defaultProps={
    purpose: "default purpose",
    trigger:{
        component: Button
    },
    content: CourseForm
}

export default connect(null, {removeError})(Popup)