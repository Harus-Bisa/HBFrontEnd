import React from "react";
import { Button, Dialog, DialogContent } from "@material-ui/core";

export default function Popup(props){
    const [open = false, setOpen] = React.useState();
    const ContentComponent = props.content

    return(
        <div>
            <Button onClick={() => setOpen(true)}>{props.purpose}</Button>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogContent>
                    <ContentComponent closePopup={() => setOpen(false)}/>
                </DialogContent>
            </Dialog>
        </div>
    )
    
}