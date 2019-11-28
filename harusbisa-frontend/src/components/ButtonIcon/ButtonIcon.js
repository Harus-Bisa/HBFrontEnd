import React from "react";
import { IconButton } from "@material-ui/core";
import MoreVertIcon from '@material-ui/icons/MoreVert';

export default function ButtonIcon(props){
    const Icon = props.icon;
    return(
        <IconButton className={props.className} onClick={props.onClick} style={props.style}>
            <Icon/>
        </IconButton>
    )
}

ButtonIcon.defaultProps={
    className:"",
    icon:MoreVertIcon,
    onClick:(()=>{})
}