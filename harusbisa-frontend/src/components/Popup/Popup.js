import React from "react";
import { Dialog, DialogContent, Button } from "@material-ui/core";
import CourseForm from "../Form/CourseForm";

export default function Popup(props){
    const [open, setOpen] = React.useState(false);
    const ContentComponent = props.content
    const Trigger = props.trigger.component
    return(
        <div>
            <Trigger className={props.trigger.className} onClick={() => setOpen(true)}>{props.purpose}</Trigger>
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