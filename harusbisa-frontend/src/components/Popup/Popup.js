import React from "react";
import { Button, Dialog, DialogContent } from "@material-ui/core";

export default function Popup(props){
    const [open, setOpen] = React.useState(false);
    const ContentComponent = props.content

    return(
        <div>
            <Button onClick={() => setOpen(true)}>{props.purpose}</Button>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogContent>
                    <ContentComponent closePopup={() => setOpen(false)} id={props.id}/>
                </DialogContent>
            </Dialog>
        </div>
    )
    
}