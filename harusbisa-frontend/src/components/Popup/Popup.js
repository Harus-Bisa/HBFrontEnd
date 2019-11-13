import React from "react";
import { Dialog, DialogContent } from "@material-ui/core";

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