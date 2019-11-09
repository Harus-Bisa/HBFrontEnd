import React from "react";
import { Button, Dialog, DialogContent } from "@material-ui/core";

export default function Popup(props){
    const [open = false, setOpen] = React.useState();
    

    return(
        <div>
            <Button onClick={() => setOpen(true)}>{props.purpose}</Button>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogContent>{props.content}</DialogContent>
            </Dialog>
        </div>
    )
    
}